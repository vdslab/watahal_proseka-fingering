import Image from "next/image";

export default function ClusteringVis({ clusteringLabels, clusteringPoints }) {
  return (
    <div className="p-3">
      <Image
        src={"/cluster.png"}
        alt="仮のクラスタリング結果"
        className="w-full"
        width={100}
        height={100}
      />
    </div>
  );
}
