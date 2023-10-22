"use client";
import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import RelationList from "./RelationList";

function ChartContent({
  links,
  nodes,
  width,
  height,
  similarityData,
  setNodeId,
  nodeId,
}) {
  useEffect(() => {
    const relationNode = new Set();
    const link = d3.select(".link");
    link
      .selectChildren()
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("stroke", (d) => {
        if (d?.source.musicId === nodeId || d?.target.musicId === nodeId) {
          relationNode.add(d.source.musicId);
          relationNode.add(d.target.musicId);
          return "red";
        } else {
          return "#999";
        }
      })
      .attr("stroke-width", (d) => {
        if (d?.source.musicId === nodeId || d?.target.musicId === nodeId) {
          return "3";
        } else {
          return "1.5";
        }
      })
      .attr("stroke-opacity", (d) => {
        if (
          d?.source.musicId === nodeId ||
          d?.target.musicId === nodeId ||
          nodeId === null ||
          nodeId === undefined
        ) {
          return "0.8";
        } else {
          return "0.4";
        }
      });
    const node = d3.select(".node");
    node
      .selectChildren()
      .on("click", (d) => {
        if (d.srcElement.__data__.musicId === nodeId) {
          setNodeId(null);
        } else {
          setNodeId(d.srcElement.__data__.musicId);
        }
      })
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("fill", (d) => {
        if (d?.musicId === nodeId) {
          return "#213E7C";
        }
        if (relationNode.has(d?.musicId)) {
          return "#3160CF";
        }
        return "black";
      })
      .attr("opacity", (d) => {
        if (d?.musicId === nodeId || nodeId === null || nodeId === undefined) {
          return "1";
        }
        if (relationNode.has(d?.musicId)) {
          return "0.75";
        }
        return "0.1";
      });
  }, [nodeId]);
  useEffect(() => {
    if (width === undefined || height === undefined) return;

    const svg = d3.select(".chartContent");
    svg.selectChildren().remove();

    const link = svg
      .append("g")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .attr("class", "node")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .on("click", (d) => setNodeId(d.srcElement.__data__.musicId))
      .attr("r", 7.5)
      .attr("class", (d) => d.musicId);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((d) => d.value)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide((d) => 20)
      )
      .on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });
  }, [similarityData, width, height]);

  return <g></g>;
}

function ZoomableSVG({ children, width, height, nodeId }) {
  const svgRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    });
    d3.select(svgRef.current).call(zoom).on("dblclick.zoom", null);

    () => {
      d3.select(svgRef.current).on(".zoom", null);
    };
  }, [svgRef.current]);

  if (width === undefined || height === undefined) {
    return <p>loading data...</p>;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor: "lightgray" }}
      ref={svgRef}
      className="chart"
    >
      <g transform={`translate(${x},${y})scale(${k})`} className="chartContent">
        {children}
      </g>
    </svg>
  );
}

export default function Relationvis({ similarityData, setNodeId, nodeId }) {
  const wrapperRef = useRef();
  const [size, setSize] = useState({ width: undefined, height: undefined });
  useEffect(() => {
    setSize({
      ...size,
      width: wrapperRef.current?.clientWidth,
      height: wrapperRef.current?.clientHeight,
    });
  }, [wrapperRef.current]);

  const nodes = similarityData.nodes.map((d) => ({ ...d }));
  const links = nodes.flatMap((node) => {
    const link = similarityData.links.filter((link) => {
      return node.id === link.source;
    });
    link.sort(function (a, b) {
      return b.value - a.value;
    });
    const slicedLink = link.slice(0, 5);
    return slicedLink.map((link) => ({ ...link, value: link.value * 20 }));
  });

  return (
    <Box height={"100%"} width={"100%"}>
      <Grid
        container
        justifyContent={"space-between"}
        spacing={3}
        height={"100%"}
        width={"100%"}
      >
        <Grid item xs={12} md={7}>
          <Box height={"100%"} width={"100%"} ref={wrapperRef}>
            <ZoomableSVG
              width={size.width}
              height={size.height}
              nodeId={nodeId}
            >
              <ChartContent
                links={links}
                nodes={nodes}
                width={size.width}
                height={size.height}
                similarityData={similarityData}
                setNodeId={setNodeId}
                nodeId={nodeId}
              ></ChartContent>
            </ZoomableSVG>
          </Box>
        </Grid>
        <Grid item xs md>
          <Box height={size.height}>
            <RelationList nodeId={nodeId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
