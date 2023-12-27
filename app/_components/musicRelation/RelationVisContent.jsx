import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

import Legend from "./Legend";

function ChartContent({
  similarityData,
  setNodeId,
  nodeId,
  selectLevelRange,
  scales,
}) {
  const [hoverNode, setHoverNode] = useState(null);
  const selectNode = useRef();

  const { nodes, links } = similarityData;

  const { nodesByNameId, nodesById, viewNodes, viewNodeIds, viewLinks } =
    useMemo(() => {
      const nodesByNameId = new Map(nodes.map((node) => [node.id, node]));
      const nodesById = new Map(nodes.map((node) => [node.musicId, node]));
      const viewNodes = nodes.filter(
        ({ level }) =>
          level >= selectLevelRange[0] && level <= selectLevelRange[1]
      );
      const viewNodeIds = new Set(viewNodes.map(({ id }) => id));
      const viewLinks = links.filter(
        ({ source, target }) =>
          viewNodeIds.has(source) && viewNodeIds.has(target)
      );
      return { nodesByNameId, nodesById, viewNodes, viewNodeIds, viewLinks };
    }, [nodes, links, selectLevelRange]);

  selectNode.current = nodesById.get(nodeId)?.id ?? null;

  const { colorScale, xScale, yScale } = scales;

  const highlightNodes = new Set(
    viewLinks
      .filter(
        ({ source, target }) =>
          source === selectNode.current || target === selectNode.current
      )
      .flatMap(({ source, target }) => [source, target])
  );

  return (
    <g className="chart_content">
      <g className="links">
        {viewLinks.map(({ source, target, value }) => {
          const sourcePosition = nodesByNameId.get(source);
          const targetPosition = nodesByNameId.get(target);
          if (sourcePosition == undefined || targetPosition == undefined) {
            return null;
          }

          const isHover = hoverNode === source || hoverNode === target;
          const isHighlight =
            source === selectNode.current ||
            target === selectNode.current ||
            isHover;
          const selecting = selectNode.current != null;
          const hovering = hoverNode != null;
          const nodeCheck = selecting || hovering;
          return (
            <line
              key={`${source}-${target}`}
              x1={xScale(sourcePosition.cx)}
              y1={yScale(sourcePosition.cy)}
              x2={xScale(targetPosition.cx)}
              y2={yScale(targetPosition.cy)}
              stroke={isHighlight ? "rgb(255, 119, 187)" : "gray"}
              strokeWidth={isHighlight ? value * 3 : value * 2}
              opacity={isHighlight ? 0.5 : nodeCheck ? 0.1 : 0.2}
            />
          );
        })}
      </g>
      <g className="nodes">
        {viewNodes.map(({ id, cx, cy, fill, musicId, level }) => {
          const isHover = hoverNode === id;
          const isSelect = selectNode.current === id;
          const isNearNode = highlightNodes.has(id);
          const selecting = selectNode.current != null;
          const hovering = hoverNode != null;
          const isHighlight = isHover || isSelect || isNearNode;
          return (
            <circle
              className={`node-${musicId}`}
              key={`${cx}-${cy}`}
              cx={xScale(cx)}
              cy={yScale(cy)}
              r={isHighlight ? "0.6%" : "0.5%"}
              fill={colorScale(level)}
              opacity={isHighlight || (!selecting && !hovering) ? 1 : 0.3}
              stroke={isSelect ? "black" : "gray"}
              strokeWidth={1.5}
              onClick={() => {
                if (selectNode.current === id) {
                  selectNode.current = null;
                  setNodeId(null);
                  return;
                }

                selectNode.current = id;
                setNodeId(musicId);
              }}
              onMouseOver={() => {
                setHoverNode(id);
              }}
              onMouseLeave={() => {
                setHoverNode(null);
              }}
            >
              <title>
                {id} : Lv {level}
              </title>
            </circle>
          );
        })}
      </g>
    </g>
  );
}

function ZoomableSVG({ children, boxSize, nodes, nodeId, scales }) {
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
    .scaleExtent([0.8, 10]);

  const { xScale, yScale } = scales;
  const { width, height } = boxSize;

  useEffect(() => {
    d3.select(svgRef.current).call(zoom).on("dblclick.zoom", null);

    () => {
      d3.select(svgRef.current).on(".zoom", null);
    };
  }, []);

  useEffect(() => {
    const node = nodes.find((node) => node.musicId === nodeId);
    if (node === undefined) {
      return;
    }
    const { cx, cy } = node;
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(700)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(4)
          .translate(-xScale(cx), -yScale(cy))
      );
  }, [nodeId]);

  if (width === undefined || height === undefined) {
    return <p>loading data...</p>;
  }

  return (
    <svg
      width={"100%"}
      height={"100%"}
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

export default function RelationVisContent({
  similarityData,
  setNodeId,
  nodeId,
  levelRange,
  selectLevelRange,
  setSelectLevelRange,
}) {
  const { nodes } = similarityData;
  console.log(nodes);

  useEffect(() => {
    if (nodeId === null || nodeId === undefined) {
      setSelectLevelRange([...selectLevelRange]);
    }
  }, [nodeId]);

  const width = 1000;
  const height = 1000;
  const boxSize = { width, height };

  const colorScale = d3
    .scaleSequential(d3.interpolateBuPu)
    .domain(d3.extent(nodes, ({ level }) => level));

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(nodes, ({ cx }) => cx))
    .range([0, width])
    .nice(10);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(nodes, ({ cy }) => cy))
    .range([height, 0])
    .nice(10);

  return (
    <Stack
      direction={"column"}
      bgcolor={"background.light"}
      boxShadow={1}
      boxSizing={"border-box"}
      height={"100%"}
    >
      <Box padding={1}>
        <Legend range={levelRange} />
      </Box>
      <Box
        padding={1}
        minHeight={"50%"}
        width={"100%"}
        boxSizing={"border-box"}
      >
        <ZoomableSVG
          boxSize={boxSize}
          nodes={nodes}
          nodeId={nodeId}
          scales={{ xScale, yScale }}
        >
          <ChartContent
            key={nodeId}
            similarityData={similarityData}
            setNodeId={setNodeId}
            nodeId={nodeId}
            selectLevelRange={selectLevelRange}
            scales={{ xScale, yScale, colorScale }}
          ></ChartContent>
        </ZoomableSVG>
      </Box>
    </Stack>
  );
}
