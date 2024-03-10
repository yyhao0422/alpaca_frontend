import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

function VideoContent({ contentData }) {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const previosPlayTime = JSON.parse(
    localStorage.getItem("playTime")
  )?.playTime;

  const [currPlayTime, setCurrPlayTime] = useState();

  useEffect(() => {
    const currentRef = playerRef.current;
    // Get the play time from the local storage
    let startingTime = previosPlayTime === null ? 0 : previosPlayTime;
    console.log(startingTime);
    // Reset the play time when the subsection changes

    if (
      JSON.parse(localStorage.getItem("subsection"))._id !== contentData._id
    ) {
      localStorage.setItem("playTime", JSON.stringify({ playTime: 0 }));
      startingTime = 0;
    }
    console.log(startingTime);
    // Set the play time to last played time
    if (currentRef) {
      console.log("setting time");
      currentRef.seekTo(startingTime);
    }
    setCurrPlayTime(startingTime);
  }, []);

  useEffect(() => {
    const savePlayTime = () => {
      localStorage.setItem(
        "playTime",
        JSON.stringify({ playTime: currPlayTime })
      );
    };

    if (currPlayTime !== 0) savePlayTime();
  }, [currPlayTime]);

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    // if (!state.seeking) {
    setCurrPlayTime(state.playedSeconds);
    // }
  };
  const handleReady = () => {
    if (playerRef.current && !isReady) {
      console.log("setting time on ready");
      playerRef.current.seekTo(currPlayTime);
      setIsReady(true);
    }
  };

  console.log(currPlayTime);

  return (
    <ReactPlayer
      ref={playerRef}
      onReady={handleReady}
      onProgress={handleProgress}
      url={contentData.contentURL}
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
