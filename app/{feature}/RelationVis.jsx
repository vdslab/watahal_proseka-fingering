"use client";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function Relationvis({ similarityData, setNodeId }) {
  const width = 600;
  const height = 600;
  const svgRef = useRef();

  const links = similarityData.links.map((d) => ({
    ...d,
    value: d.value * 20,
  }));
  const nodes = similarityData.nodes.map((d) => ({ ...d }));

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
    );

  useEffect(() => {
    const svg = d3.select(svgRef.current);

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
        console.log(d.srcElement.__data__.musicId);
        setNodeId(d.srcElement.__data__.musicId);
      })
      .attr("r", 5);

    node.append("title").text(function (d) {
      return d.id;
    });

    // Add a drag behavior.
    // node.call(
    // .on("start", dragstarted)
    // .on("drag", dragged)
    // .on("end", dragended)
    // );

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // simulation.on("tick", () => {
    //   link.attr(
    //     "d",
    //     (d) =>
    //       `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`
    //   );
    //   node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    // });

    // Reheat the simulation when drag starts, and fix the subject position.
    // function dragstarted(event) {
    //   if (!event.active) simulation.alphaTarget(0.3).restart();
    //   event.subject.fx = event.subject.x;
    //   event.subject.fy = event.subject.y;
    // }

    // Update the subject (dragged node) position during drag.
    // function dragged(event) {
    //   event.subject.fx = event.x;
    //   event.subject.fy = event.y;
    // }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    // function dragended(event) {
    //   if (!event.active) simulation.alphaTarget(0);
    //   event.subject.fx = null;
    //   event.subject.fy = null;
    // }

    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    //   invalidation.then(() => simulation.stop());
    return () => {
      d3.selectAll(".chart > g").remove();
    };
  });

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
