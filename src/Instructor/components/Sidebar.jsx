import SidebarItem from "./SidebarItem";

import { Typography, Button, List } from "@mui/material";

function Sidebar(classroomData) {
  console.log(classroomData.classroomData.sections);
  return (
    <div className="mr-10  w-[250px]">
      <Typography variant="h6" sx={{ marginBottom: "40px" }}>
        {classroomData.title}
      </Typography>
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {classroomData.classroomData.sections.map((section) => {
          return <SidebarItem key={section._id} section={section} />;
        })}
      </List>
    </div>
  );
}

export default Sidebar;
