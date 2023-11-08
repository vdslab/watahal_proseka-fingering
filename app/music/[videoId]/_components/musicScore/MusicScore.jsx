"use client";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function MusicScore({ id }) {
  const { data, error, isLoading } = useSWR(
    `/api/music/musicScore/${id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
}
