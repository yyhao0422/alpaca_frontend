import { useState } from "react";
import axios from "axios";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

function SubSection({ subsection, sectionId, reloadClassroomData }) {
  const [openDeleteSectionDialog, setOpenDeleteSectionDialog] = useState(false);
  const [isDeletingSection, setIsDeletingSection] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const parts = currentPath.split("/");

  const classroomId = parts[4];
  parts[parts.length - 2] = sectionId;
  parts[parts.length - 1] = subsection._id;

  const newPath = parts.join("/");

  function handleSubSectionClick() {
    navigate(newPath, { shallow: true });
  }

  function handleDeleteSubsectionClick() {
    setOpenDeleteSectionDialog(true);
  }

  async function handleDeleteSubSection() {
    setIsDeletingSection(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomId}/${sectionId}/${subsection._id}`
      );

      if (response.status === 204) {
        navigate(`/instructor/classroom/manage/${classroomId}/empty/empty`, {
          replace: true,
        });
      }

      if (!response.ok) {
        throw new Error("Error deleting subsection");
      }
    } catch (error) {
      setError(error.message || "Error deleting subsection");
    }
    setIsDeletingSection(false);
    reloadClassroomData();
  }

  return (
    <>
      <ListItemButton
        selected={currentPath === newPath}
        sx={{ pl: 4 }}
        className="group"
        onClick={handleSubSectionClick}
      >
        <ListItemText primary={subsection.title} />
        <DeleteIcon
          className="text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible "
          onClick={handleDeleteSubsectionClick}
        />
      </ListItemButton>
      <>
        <Dialog
          open={openDeleteSectionDialog}
          onClose={() => setOpenDeleteSectionDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this subsection ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The content of subsection will be deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteSectionDialog(false)}>
              No
            </Button>
            <Button onClick={handleDeleteSubSection} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

export default SubSection;
