import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

import RangeSlider from "./RangeSlider";
import Legend from "./Legend";

function ChartContent({
  width,
  height,
  similarityData,
  setNodeId,
  selectLevelRange,
}) {
  const [hoverNode, setHoverNode] = useState(null);
  const selectNode = useRef(null);

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
    .domain(d3.extent(nodes, ({ cx }) => cx))
    .range([0, width])
    .nice(10);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(nodes, ({ cy }) => cy))
    .range([height, 0])
    .nice(10);

  const highlightNodes = new Set(
    viewLinks
      .filter(
        ({ source, target }) =>
          source === selectNode.current || target === selectNode.current
      )
      .flatMap(({ source, target }) => [source, target])
  );

  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <g className="chart_content">
      <g className="links">
        {viewLinks.map(({ source, target, value }) => {
          const sourcePosition = nodesById.get(source);
          const targetPosition = nodesById.get(target);
          if (sourcePosition == undefined || targetPosition == undefined) {
            return null;
          }

          const isHover = hoverNode === source || hoverNode === target;
          const isHighlight =
            source === selectNode.current ||
            target === selectNode.current ||
            isHover;
          return (
            <line
              key={`${source}-${target}`}
              x1={xScale(sourcePosition.cx)}
              y1={yScale(sourcePosition.cy)}
              x2={xScale(targetPosition.cx)}
              y2={yScale(targetPosition.cy)}
              stroke={isHighlight ? "rgb(255, 119, 187)" : "black"}
              strokeWidth={isHighlight ? value * 3 : value * 2}
              opacity={isHighlight ? 0.5 : 0.1}
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
          const isHighlight = isHover || isNearNode || isSelect;
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={xScale(cx)}
              cy={yScale(cy)}
              r={isHighlight ? "0.6%" : "0.5%"}
              fill={colorScale(level)}
              opacity={isHighlight || !selecting ? 1 : 0.3}
              stroke={"black"}
              strokeWidth={1.5}
              strokeOpacity={0.8}
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

function ZoomableSVG({ children, width, height }) {
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

export default function RelationVisContent({
  similarityData,
  setNodeId,
  nodeId,
}) {
  const { nodes: originNodes, links: originLinks } = similarityData;
  const levelRange = d3.extent(originNodes, ({ level }) => level);
  const [selectLevelRange, setSelectLevelRange] = useState(levelRange);

  const links = originNodes.flatMap((node) => {
    const link = originLinks.filter((link) => {
      return node.id === link.source;
    });
    link.sort(function (a, b) {
      return b.value - a.value;
    });
    const slicedLink = link.slice(0, 5);
    return slicedLink.map((link) => ({ ...link, value: link.value * 20 }));
  });

  function handleLevelRangeChange(newValue) {
    setSelectLevelRange(newValue);
  }

  useEffect(() => {
    if (nodeId === null || nodeId === undefined) {
      setSelectLevelRange([...selectLevelRange]);
    }
  }, [nodeId]);

  return (
    <Stack justifyContent={"space-between"} spacing={1}>
      <Card sx={{ backgroundColor: "background.light" }}>
        <CardContent>
          <Typography variant="h5">フィルター</Typography>
          <Box padding={1}>
            <Typography alignSelf={"center"}>表示する楽曲レベル</Typography>
            <RangeSlider
              range={levelRange}
              handleLevelRangeChange={handleLevelRangeChange}
            />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: "background.light" }}>
        <Stack direction={"column"} justifyContent={"flex-end"}>
          <Box padding={1} paddingX={3} paddingTop={2}>
            <Legend range={levelRange} />
          </Box>
          <Box padding={3} paddingTop={0}>
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              alignItems={"flex-end"}
            >
              <ZoomableSVG width={1000} height={1000}>
                <ChartContent
                  links={links}
                  nodes={originNodes}
                  width={1000}
                  height={1000}
                  similarityData={similarityData}
                  setNodeId={setNodeId}
                  nodeId={nodeId}
                  selectLevelRange={selectLevelRange}
                ></ChartContent>
              </ZoomableSVG>
            </Box>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}
