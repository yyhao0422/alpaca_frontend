import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function SidebarItem({ section }) {
  const [open, setOpen] = useState(false);

  function handleItemClick() {
    setOpen(!open);
  }
  console.log(section);

  return (
    <>
      <ListItemButton onClick={handleItemClick}>
        <ListItemText primary={section.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.subsections.map((subsection) => {
            return (
              <ListItemButton sx={{ pl: 4 }} key={subsection._id}>
                <ListItemText primary={subsection.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItem;
