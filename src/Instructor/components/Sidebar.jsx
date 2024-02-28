import { useState } from "react";
import SidebarItem from "./SidebarItem";

import { Typography, Button, List, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Sidebar({ classroomData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleSettingClick(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mr-10  w-[400px]  ">
      <div className="flex justify-between w-[360px]">
        <Typography variant="h6" sx={{ marginBottom: "40px" }}>
          {classroomData.title}
        </Typography>
        <SettingsIcon
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            transform: "translateY(3px)",
          }}
          onClick={handleSettingClick}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>
            <EditIcon sx={{ marginRight: "5px" }} />
            Edit Title
          </MenuItem>
          <MenuItem>
            <EditIcon sx={{ marginRight: "5px" }} />
            Edit Description
          </MenuItem>
          <MenuItem>
            <UploadIcon sx={{ marginRight: "5px" }} />
            New Classroom Image
          </MenuItem>
          <MenuItem>
            <DeleteIcon sx={{ marginRight: "5px" }} />
            Delete Classroom
          </MenuItem>
        </Menu>
      </div>
      <div className="w-[300px]">
        <Typography variant="subtitle2">{classroomData.description}</Typography>
      </div>

      <List
        sx={{ width: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {classroomData.sections.map((section) => {
          return <SidebarItem key={section._id} section={section} />;
        })}
        <div className="text-center cursor-pointer mt-5 text-gray-400 hover:text-gray-800">
          <AddCircleOutlineIcon sx={{ marginRight: "5px" }} />
          Add Section
        </div>
      </List>
    </div>
  );
}

export default Sidebar;
