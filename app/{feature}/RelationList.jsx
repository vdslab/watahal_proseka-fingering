"use client";
import path from "path";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RelationList({ nodeId }) {
  const { data: musicListData, error } = useSWR("/api/music", fetcher);
  const { data: similarityData, error2 } = useSWR(
    nodeId ? `/api/music/similarity/${nodeId}` : null,
    fetcher
  );

  if (error || error2) return <div>Failed to load</div>;
  if (!musicListData) return <div>Loading...</div>;
  if (!similarityData) return <div>Loading...</div>;

  const music = musicListData.find((music) => music.id === nodeId);
  similarityData.sort((a, b) => b.similarity - a.similarity);
  const similarMusics = similarityData
    .slice(0, 10)
    .map(({ target }) => musicListData.find((music) => music.id === target));

  return (
    <div>
      <p>{music?.name}</p>
      {similarMusics.map(({ id, name, videoId }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
}
