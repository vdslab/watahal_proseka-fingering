"use client";
import * as d3 from "d3";
import { useRef, useEffect, useMemo } from "react";

export default function Relationvis({ similarityData, setNodeId }) {
  const width = 600;
  const height = 600;
  const svgRef = useRef();
  const links = similarityData.links.map((d) => ({
    ...d,
    value: d.value * 20,
  }));
  const nodes = similarityData.nodes.map((d) => ({ ...d }));

  const { simulation } = useMemo(() => {
    const svg = d3.select(svgRef.current);
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

    return { simulation };
  }, [similarityData]);

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: "lightgray" }}
      ref={svgRef}
      className="chart"
    ></svg>
  );
}
