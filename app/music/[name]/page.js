import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import TimeSlider from "./{feature}/TimeSlider";
import VideoManagerButtons from "./{feature}/VideoManagerButtons";

export default function Home({ params: { name } }) {
  const music_name = decodeURI(name);
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-11/12">
          <div className="flex items-end">
            <p>{music_name}</p>
          </div>
        </div>
        <div className="w-1/12">
          <SideMenu />
        </div>
      </div>
      <div className="m-1 px-3">
        <TimeSlider max={300} />
      </div>
      <div>
        <VideoManagerButtons />
      </div>
      <iframe
        // width="100%"
        height="100%"
        src="https://www.youtube.com/embed/lIfHd0bEDNQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </>
  );
}
