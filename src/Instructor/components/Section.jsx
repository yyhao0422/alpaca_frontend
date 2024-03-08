import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import axios from "axios";

import {
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  ListItemButton,
  List,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import SubSection from "./SubSection";

function Section({ id, section, classroomId, reloadClassroomData }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMoreHorizIcon = Boolean(anchorEl);
  const [error, setError] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSubmittingTitle, setIsSubmittingTitle] = useState(false);
  const titleRef = useRef();
  const [openDeleteSectionDialog, setOpenDeleteSectionDialog] = useState(false);
  const [isDeletingSection, setIsDeletingSection] = useState(false);
  const subSectionTitleRef = useRef();
  const [isAddingSubsection, setIsAddingSubsection] = useState(false);
  const [isSubmittingSubsection, setIsSubmittingSubsection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const parts = location.pathname.split("/");
  const sectionId = parts[5];

  useEffect(() => {
    if (sectionId === section._id) {
      setOpen(true);
    }
  }, [sectionId, section]);

  // Add Subsection

  function handleAddSubsectionClick() {
    setOpen(true);
    setIsAddingSubsection(true);
  }

  function handleCancelAddSubsection() {
    setIsAddingSubsection(false);
  }

  async function handleAddSubsection() {
    setIsSubmittingSubsection(true);
    const title = subSectionTitleRef.current.value;
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomId}/${section._id}`,
        { title }
      );

      navigate(
        `/instructor/classroom/manage/${classroomId}/${section._id}/${response.data.data.subsection._id}`,
        {
          replace: true,
        }
      );

      if (!response.ok) {
        throw new Error("Error adding subsection");
      }
    } catch (error) {
      setError(error.message || "Error adding subsection");
    }
    setIsAddingSubsection(false);
    reloadClassroomData();
  }

  // Delete Section

  async function handleDeleteSection() {
    setIsDeletingSection(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomId}/${section._id}`
      );
      if (!response.ok) {
        throw new Error("Error updating section title");
      }
    } catch (error) {
      setError(error.message || "Error deleting section");
    }
    setIsDeletingSection(false);
    setOpenDeleteSectionDialog(false);
    reloadClassroomData();
  }

  function handleDeleteSectionClick() {
    setAnchorEl(null);
    setOpenDeleteSectionDialog(true);
  }

  // Edit Title

  async function handleEditTitleSection() {
    setIsSubmittingTitle(true);
    const title = titleRef.current.value;

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomId}/${section._id}`,
        { title }
      );

      if (!response.ok) {
        throw new Error("Error updating section title");
      }
    } catch (error) {
      setError(error.message || "Error updating section title");
    }

    setIsEditingTitle(false);
    setAnchorEl(null);
    reloadClassroomData();
  }

  function handleCancelEditTitleSection() {
    setIsEditingTitle(false);
    setAnchorEl(null);
  }

  function handleMoreHorizClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleSectionClick() {
    setOpen(!open);
    setIsAddingSubsection(false);
    setAnchorEl(null);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <ListItem className="group cursor-pointer hover:bg-blue-200">
        <>
          {!isEditingTitle ? (
            <>
              <ListItemText
                onClick={handleSectionClick}
                disableTypography
                primary={
                  <Typography sx={{ fontWeight: "10px" }}>
                    {section.title}
                  </Typography>
                }
              />
              <AddIcon
                onClick={handleAddSubsectionClick}
                className="absolute text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible right-12"
              />
              <MoreHorizIcon
                className={`absolute text-gray-500 rounded-full hover:text-white hover:bg-gray-500 z-40 cursor-pointer group-hover:visible invisible  right-20`}
                onClick={handleMoreHorizClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={openMoreHorizIcon}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setIsEditingTitle(true)}>
                  <EditIcon sx={{ marginRight: "5px" }} />
                  Edit Title
                </MenuItem>

                <MenuItem onClick={handleDeleteSectionClick}>
                  <DeleteIcon sx={{ marginRight: "5px" }} />
                  Delete Section
                </MenuItem>
              </Menu>
              {open ? (
                <ExpandLess onClick={handleSectionClick} />
              ) : (
                <ExpandMore onClick={handleSectionClick} />
              )}
            </>
          ) : (
            <div className="flex justify-between items-center">
              <TextField
                inputRef={titleRef}
                defaultValue={section.title}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditTitleSection();
                  }
                }}
              />
              <DoneIcon
                className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3  "
                onClick={handleEditTitleSection}
              />
              <ClearIcon
                className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3"
                onClick={handleCancelEditTitleSection}
              />
            </div>
          )}
        </>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.subsections.map((subsection) => {
            return (
              <SubSection
                subsection={subsection}
                sectionId={section._id}
                key={subsection._id}
                reloadClassroomData={() => reloadClassroomData()}
              />
            );
          })}
          {isAddingSubsection && (
            <div className="flex justify-between items-center">
              <TextField
                inputRef={subSectionTitleRef}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSubsection();
                  }
                }}
              />
              <DoneIcon
                className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3  "
                onClick={handleAddSubsection}
              />
              <ClearIcon
                className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3"
                onClick={handleCancelAddSubsection}
              />
            </div>
          )}
        </List>
      </Collapse>
      <>
        <Dialog
          open={openDeleteSectionDialog}
          onClose={() => setOpenDeleteSectionDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this section ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The content of the section and all its subsections will be deleted
              automatically after the section deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteSectionDialog(false)}>
              No
            </Button>
            <Button onClick={handleDeleteSection} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

export default Section;
