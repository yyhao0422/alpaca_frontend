import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import VideoContent from "./components/VideoContent";
import TextContent from "./components/TextContent";

function ClassroomPage() {
  const [contentData, setContentData] = useState({});
  const { id } = useParams();
  let location = useLocation();

  const classroomData = location.state.classroomData;
  console.log(contentData);
  console.log(Object.keys(contentData).length);

  return (
    <div className="mx-48 flex mt-5 ">
      <Sidebar
        classroomData={classroomData}
        onShow={(data) => setContentData(data)}
      />
      <div>
        {Object.keys(contentData).length === 0 ? (
          <p>Select a section</p>
        ) : contentData.contentType === "video" ? (
          <VideoContent videoUrl={contentData.contentURL} />
        ) : (
          <TextContent
            data={{
              title: contentData.contentTitle,
              description: contentData.contentDescription,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ClassroomPage;
