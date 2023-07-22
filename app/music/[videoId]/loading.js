import LoadingSpin from "@/components/LoadingSpin";
export default function Loading() {
  return (
    <div className="justify-self-center self-center">
      <p>Loading YouTube...</p>
      <LoadingSpin />
    </div>
  );
}
