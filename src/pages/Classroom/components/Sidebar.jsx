import SidebarItem from "./SidebarItem";

import { Typography, Button, List } from "@mui/material";

function Sidebar({ classroomData, onShow, itemActive }) {
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
        {classroomData.sections.map((section) => {
          return (
            <SidebarItem
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
