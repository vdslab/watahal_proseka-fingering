import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import TimeSlider from "./{feature}/TimeSlider";

export default function Home({ params: { name } }) {
  const music_name = decodeURI(name);
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-11/12">
          <p>{music_name}</p>
        </div>
        <div className="w-1/12">
          <SideMenu />
        </div>
      </div>
      <div className="p-3">
        <TimeSlider max={300} />
      </div>
    </>
  );
}
