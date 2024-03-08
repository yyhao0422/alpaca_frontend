import { CardMedia } from "@mui/material";
import playIcon from "../../../assets/playIcon.png";
import ReactPlayer from "react-player";

function VideoContent({ videoUrl }) {
  return (
    // <CardMedia
    //   sx={{ width: "700px", height: "400px" }}
    //   component="iframe"
    //   src={videoUrl}
    //   allow="autoPlay"
    // ></CardMedia>
    <ReactPlayer
      url={videoUrl}
      controls={true}
      width="100%"
      height="100%"
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
