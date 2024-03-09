import Section from "./Section";
import { useEffect, useState } from "react";

import { Typography, Button, List } from "@mui/material";

function Sidebar({ classroomData, onShow, itemActive }) {
  const [sections, setSections] = useState([]);

  // Get the sections from the classroomData
  useEffect(() => {
    const sortedSections = classroomData.sections.sort((a, b) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    );
    setSections(sortedSections);
  }, [classroomData]);

  return (
    <div className="mr-10  w-[400px] ">
      <Typography variant="h6" sx={{ marginBottom: "40px" }}>
        {classroomData.title}
      </Typography>
      <List
        sx={{ width: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {sections.map((section) => {
          return (
            <Section
              key={section._id}
              section={section}
              onShow={(data) => onShow(data)}
              itemActive={itemActive}
            />
          );
        })}
      </List>
    </div>
  );
}

export default Sidebar;
