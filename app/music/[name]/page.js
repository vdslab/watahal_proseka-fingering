import SideMenu from "@/components/SideMenu";
import Content from "./{feature}/Content";

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
      <Content />
    </>
  );
}
