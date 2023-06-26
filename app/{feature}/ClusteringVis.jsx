import Image from "next/image";

export default function ClusteringVis() {
  return (
    <div className="p-3">
      <Image src={"/cluster.png"} className="w-full" width={100} height={100} />
    </div>
  );
}
