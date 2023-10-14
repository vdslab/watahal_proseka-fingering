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
}) {
  useEffect(() => {
    if (width === undefined || height === undefined) return;

    const svg = d3.select(".chartContent");
    svg.selectChildren().remove();

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .on("click", function (d) {
        setNodeId(d.srcElement.__data__.musicId);
      })
      .attr("r", 5);

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
        node.append("title").text(function (d) {
          return d.id;
        });

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });
  }, [similarityData, width, height]);

  return <g></g>;
}

function ZoomableSVG({ children, width, height }) {
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
    d3.select(svgRef.current).call(zoom);

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
            <ZoomableSVG width={size.width} height={size.height}>
              <ChartContent
                links={links}
                nodes={nodes}
                width={size.width}
                height={size.height}
                similarityData={similarityData}
                setNodeId={setNodeId}
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
