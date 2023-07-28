import ContourVis from "./ContourVis";
import DetailPlot from "./DetailPlot";

export default function ClusteringVis({ clusteringData, id }) {
  return (
    <div className="p-3 w-full">
      {id == null ? (
        <ContourVis {...{ clusteringData }} />
      ) : (
        <DetailPlot
          clusteringData={clusteringData.filter((data) => data.id == id)}
        />
      )}
    </div>
  );
}
