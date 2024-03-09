import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import VideoContent from "./components/VideoContent";
import TextContent from "./components/TextContent";

function ClassroomPage() {
  const [contentData, setContentData] = useState({});

  useEffect(() => {
    const subsection = JSON.parse(localStorage.getItem("subsection"));
    if (subsection) {
      setContentData(subsection);
    }
  }, []);

  const { id } = useParams();
  let location = useLocation();

  const classroomData = location.state.classroomData;
  console.log(classroomData);

  return (
    <div className="mx-48 flex mt-5 ">
      <Sidebar
        classroomData={classroomData}
        onShow={(data) => setContentData(data)}
        itemActive={contentData._id || ""}
      />
      <div>
        {Object.keys(contentData).length === 0 ? (
          <p>Select a section</p>
        ) : contentData.contentType ? (
          contentData.contentType === "video" ? (
            <VideoContent contentData={contentData} />
          ) : (
            <TextContent
              data={{
                title: contentData.contentTitle,
                description: contentData.contentDescription,
              }}
            />
          )
        ) : (
          <p>作者还未添加任何内容哦</p>
        )}
      </div>
    </div>
  );
}

export default ClassroomPage;
