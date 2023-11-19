"use client";
import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import RelationList from "./RelationList";
import RangeSlider from "./RangeSlider";
import Legend from "./Legend";

function ChartContent({
  // links,
  // nodes,
  width,
  height,
  similarityData,
  setNodeId,
  nodeId,
  selectLevelRange,
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const { nodes, links } = similarityData;
  const viewNodes = nodes.filter(
    ({ level }) => level >= selectLevelRange[0] && level <= selectLevelRange[1]
  );
  const viewNodeIds = new Set(viewNodes.map(({ id }) => id));
  const viewLinks = links.filter(
    ({ source, target }) => viewNodeIds.has(source) && viewNodeIds.has(target)
  );

  const colorScale = d3
    .scaleSequential(d3.interpolateBuPu)
    .domain(d3.extent(nodes, ({ level }) => level));

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(nodes, ({ cx }) => cx * 0.5))
    .range([0, width])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(nodes, ({ cy }) => cy * 0.5))
    .range([height, 0])
    .nice();

  const idToNodeLocation = nodes.reduce((acc, node) => {
    acc[node.id] = { cx: xScale(node.cx), cy: yScale(node.cy) };
    return acc;
  });

  const highlightNodes = new Set(
    viewLinks
      .filter(
        ({ source, target }) =>
          source === selectedNode || target === selectedNode
      )
      .flatMap(({ source, target }) => [source, target])
  );

  return (
    <g className="chart_content">
      <g className="links">
        {viewLinks.map(({ source, target, value }) => {
          if (
            idToNodeLocation[source] === undefined ||
            idToNodeLocation[target] === undefined
          ) {
            return null;
          }
          const isHightlighted =
            source === selectedNode || target === selectedNode;
          return (
            <line
              key={`${source}-${target}`}
              x1={idToNodeLocation[source].cx}
              y1={idToNodeLocation[source].cy}
              x2={idToNodeLocation[target].cx}
              y2={idToNodeLocation[target].cy}
              stroke={isHightlighted ? "rgb(255, 119, 187)" : "black"}
              strokeWidth={isHightlighted ? value * 3 : value * 2}
              opacity={selectedNode === null ? 0.3 : isHightlighted ? 0.5 : 0.1}
            />
          );
        })}
      </g>
      <g className="nodes">
        {viewNodes.map(({ id, cx, cy, fill, musicId, level }) => {
          const isHightlighted = selectedNode === id || highlightNodes.has(id);
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={xScale(cx)}
              cy={yScale(cy)}
              r={5}
              fill={colorScale(level)}
              stroke={isHightlighted ? "black" : "white"}
              strokeWidth={1}
              opacity={isHightlighted || selectedNode === null ? 1 : 0.3}
              onClick={() => {
                if (selectedNode === id) {
                  setSelectedNode(null);
                  setNodeId(null);
                  return;
                }
                setNodeId(musicId);
                setSelectedNode(id);
              }}
            />
          );
        })}
      </g>
    </g>
  );
}

function ZoomableSVG({
  children,
  width,
  height,
  nodeId,
  similarityDataByNodeId,
}) {
  const svgRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const zoom = d3
    .zoom()
    .on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    })
    .scaleExtent([0.3, 3]);

  useEffect(() => {
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
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
    networkSizeRate: 0.8,
  });

  const levelRange = d3.extent(similarityData.nodes, ({ level }) => level);
  const [selectLevelRange, setSelectLevelRange] = useState(levelRange);
  function handleLevelRangeChange(newValue) {
    setSelectLevelRange(newValue);
  }

  useEffect(() => {
    setSize({
      ...size,
      width: wrapperRef.current?.clientWidth,
      height: wrapperRef.current?.clientHeight,
    });
  }, [wrapperRef.current]);

  useEffect(() => {
    if (nodeId === null || nodeId === undefined) {
      setSelectLevelRange([...selectLevelRange]);
    }
  }, [nodeId]);

  const { nodes } = similarityData;
  const similarityDataByNodeId = similarityData.nodes.reduce((acc, node) => {
    acc[node.musicId] = node;
    return acc;
  }, {});

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
            <Box height={`${100 * (1 - size.networkSizeRate)}%`} width={"100%"}>
              <RangeSlider
                range={levelRange}
                handleLevelRangeChange={handleLevelRangeChange}
              />
            </Box>
            <Box
              height={`${100 * size.networkSizeRate}%`}
              width={"100%"} /*ref={wrapperRef}*/
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              flexWrap={"nowrap"}
            >
              <Box>
                <Legend range={levelRange} />
              </Box>
              <Box>
                <ZoomableSVG
                  width={size.width}
                  height={size.height * size.networkSizeRate}
                  nodeId={nodeId}
                  similarityDataByNodeId={similarityDataByNodeId}
                >
                  <ChartContent
                    links={links}
                    nodes={nodes}
                    width={size.width}
                    height={size.height * size.networkSizeRate}
                    similarityData={similarityData}
                    setNodeId={setNodeId}
                    nodeId={nodeId}
                    selectLevelRange={selectLevelRange}
                  ></ChartContent>
                </ZoomableSVG>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs md>
          <Box height={"100%"}>
            <RelationList nodeId={nodeId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
