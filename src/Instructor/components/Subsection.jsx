import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";

import { useLocation, useNavigate } from "react-router-dom";

function SubSection({ subsection, sectionId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const parts = currentPath.split("/");

  parts[parts.length - 2] = sectionId;
  parts[parts.length - 1] = subsection._id;

  const newPath = parts.join("/");

  function handleSubSectionClick() {
    navigate(newPath, { shallow: true });
  }
  return (
    <ListItemButton
      selected={currentPath === newPath}
      sx={{ pl: 4 }}
      className="group"
      onClick={handleSubSectionClick}
    >
      <ListItemText primary={subsection.title} />
      <DeleteIcon className="text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible " />
    </ListItemButton>
  );
}

export default SubSection;
