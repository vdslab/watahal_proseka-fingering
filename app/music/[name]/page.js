import Content from "./{feature}/Content";

export default function Home({ params: { name } }) {
  const videoid = decodeURI(name);
  console.log(typeof music_name);
  return (
    <>
      {/* <div className="flex flex-row items-center">
        <div className="w-11/12">
          <div className="flex items-end">
            <p>{music_name}</p>
          </div>
        </div>
        <div className="w-1/12"></div>
      </div> */}
      <Content {...{ videoid }} />
    </>
  );
}
