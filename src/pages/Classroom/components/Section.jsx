import { useEffect, useState } from "react";

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
import { Typography } from "@mui/material";

function Section({ section, onShow, itemActive }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const subsection = JSON.parse(localStorage.getItem("subsection"));
    if (subsection && subsection.sectionId === section._id) {
      setOpen(true);
    }
  }, [section._id]);

  function handleSectionClick() {
    setOpen(!open);
  }

  return (
    <>
      <ListItemButton onClick={handleSectionClick}>
        <ListItemText
          disableTypography
          primary={
            <Typography sx={{ fontWeight: "10px" }}>{section.title}</Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.subsections.map((subsection) => {
            return (
              <ListItemButton
                sx={{ pl: 4 }}
                key={subsection._id}
                onClick={() => {
                  localStorage.setItem(
                    "subsection",
                    JSON.stringify({ ...subsection, sectionId: section._id })
                  );
                  onShow(subsection);
                }}
                selected={itemActive === subsection._id}
              >
                <ListItemText primary={subsection.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default Section;
