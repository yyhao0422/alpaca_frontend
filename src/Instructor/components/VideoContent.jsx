import ReactPlayer from "react-player";

function VideoContent({ videoUrl }) {
  return (
    <ReactPlayer
      url={videoUrl}
      controls={true}
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
          },
        },
      }}
    />
  );
}

export default VideoContent;
