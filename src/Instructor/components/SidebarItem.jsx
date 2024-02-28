import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Typography } from "@mui/material";

function SidebarItem({ section, onShow }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMoreHorizIcon = Boolean(anchorEl);

  function handleMoreHorizClick(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSectionClick() {
    setOpen(!open);
  }

  function handleAddSubsection() {
    console.log("Add button clicked");
  }

  return (
    <>
      <ListItemButton className="group">
        <AddIcon
          onClick={handleAddSubsection}
          className="absolute text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible right-12"
        />
        <MoreHorizIcon
          className={`absolute text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible  right-20`}
          onClick={handleMoreHorizClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={openMoreHorizIcon}
          onClose={handleClose}
        >
          <MenuItem>
            <EditIcon sx={{ marginRight: "5px" }} />
            Edit Title
          </MenuItem>

          <MenuItem>
            <DeleteIcon sx={{ marginRight: "5px" }} />
            Delete Classroom
          </MenuItem>
        </Menu>
        <ListItemText
          onClick={handleSectionClick}
          disableTypography
          primary={
            <Typography sx={{ fontWeight: "10px" }}>{section.title}</Typography>
          }
        />
        {open ? (
          <ExpandLess onClick={handleSectionClick} />
        ) : (
          <ExpandMore onClick={handleSectionClick} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.subsections.map((subsection) => {
            return (
              <ListItemButton
                sx={{ pl: 4 }}
                key={subsection._id}
                onClick={() => onShow(subsection)}
                className="group"
              >
                <ListItemText primary={subsection.title} />
                <DeleteIcon className="text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible " />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItem;
