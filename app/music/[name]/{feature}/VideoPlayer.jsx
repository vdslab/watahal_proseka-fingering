import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";

export default function VideoPlayer() {
  return (
    <>
      <div>
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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
}
