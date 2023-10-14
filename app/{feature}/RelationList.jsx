"use client";
import path from "path";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RelationList({ nodeId }) {
  const { data, error } = useSWR("/api/musics", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const music = data.find((music) => music.id === nodeId);

  return (
    <div>
      <p>{music.name}</p>
    </div>
  );
}
