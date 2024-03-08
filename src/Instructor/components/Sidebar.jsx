import { useState, createElement, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Section from "./Section";
import {
  Typography,
  Button,
  List,
  Menu,
  MenuItem,
  Input,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Card,
  DialogActions,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import UploadIcon from "@mui/icons-material/Upload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { DndContext, closestCenter, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function Sidebar() {
  const navigator = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [classroomData, setClassroomData] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchClassroom() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/classrooms/" + id
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("An error occurred while fetching classrooms!");
        }
        const classroom = data.data.classroom;

        setClassroomData(classroom);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching classrooms!"
        );
      }
      setIsLoading(false);
    }

    fetchClassroom();
  }, [id, reload]);

  // Edit Title State
  const [isEdittingTitle, setIsEdittingTitle] = useState(false);
  const [title, setTitle] = useState(classroomData.title);

  // Edit Description State
  const [isEdittingDescription, setIsEdittingDescription] = useState(false);
  const [description, setDescription] = useState(classroomData.description);

  // Edit Image State
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [file, setFile] = useState(""); // Image File
  const [image, setImage] = useState(null); //
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  // Delete Classroom State
  const [openDeleteClassroomDialog, setOpenDeleteClassroomDialog] =
    useState(false);
  const [isLoadingDeleteClassroom, setIsLoadingDeleteClassroom] =
    useState(false);

  // Add Section State
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isLoadingAddSection, setIsLoadingAddSection] = useState(false);
  const sectionTitleRef = useRef();

  useEffect(() => {
    setTitle(classroomData.title);
    setDescription(classroomData.description);
  }, [classroomData]);

  async function handleAddSection() {
    setIsLoadingAddSection(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomData._id}`,
        {
          title: sectionTitleRef.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "An error occurred while adding section"
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred while adding section");
    }
    setIsLoadingAddSection(false);
    setIsAddingSection(false);
    setReload((prev) => !prev);
  }

  function AddSection() {
    return (
      <div className="w-full flex justify-between items-center">
        <TextField
          type="text"
          inputRef={sectionTitleRef}
          className="w-full  resize-none"
          color="primary"
        />
        <DoneIcon
          className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3  "
          onClick={handleAddSection}
        />
        <ClearIcon
          className="cursor-pointer hover:bg-slate-400 rounded-sm ml-3"
          onClick={() => setIsAddingSection(false)}
        />
      </div>
    );
  }

  async function handleDeleteClassroom() {
    setIsLoadingDeleteClassroom(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomData._id}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "An error occurred while deleting classroom"
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred while deleting classroom");
    }
    setIsLoadingDeleteClassroom(false);
    navigator("/instructor");
  }
  const handleFileUpload = (event) => {
    let image_file = event.target.files[0];

    //display image
    let reader = new FileReader();
    reader.readAsDataURL(image_file);
    reader.onload = (event) => {
      let image_url = event.target.result;
      let img = createElement("img", { src: image_url, alt: "classroom" });
      setImage(img);
    };

    setFile(image_file);
  };
  function handleImageDialogOpen() {
    setOpenImageDialog(true);
  }
  function handleImageDialogClose() {
    setOpenImageDialog(false);
  }
  async function handleImageSubmit() {
    console.log("submitting image");
    setIsLoadingUploadImage(true);
    const formData = new FormData();
    formData.append("classroomImage", file);
    try {
      const res = await axios.put(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "An error occurred while updating classroom image"
        );
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while updating classroom image"
      );
    }
    setIsLoadingUploadImage(false);
    setOpenImageDialog(false);
    setReload((prev) => !prev);
  }
  function handleEditTitleClick() {
    setAnchorEl(null);
    setIsEdittingTitle(true);
  }
  async function handleEditTitleConfirm() {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "An error occurred while updating classroom title"
        );
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while updating classroom title"
      );
    }
    setIsEdittingTitle(false);
    setReload((prev) => !prev);
  }
  function handleEditDescriptionClick() {
    setAnchorEl(null);
    setIsEdittingDescription(true);
    setReload((prev) => !prev);
  }
  async function handleEditDescriptionConfirm() {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message ||
            "An error occurred while updating classroom description"
        );
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while updating classroom description"
      );
    }
    setIsEdittingDescription(false);
    setReload((prev) => !prev);
  }

  return (
    <div className="mr-10  w-[400px]  ">
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.keys(classroomData).length !== 0 && (
        <>
          <div className="flex justify-between w-[360px]">
            {!isEdittingTitle ? (
              <Typography variant="h6" sx={{ marginBottom: "40px" }}>
                {classroomData.title}
              </Typography>
            ) : (
              <div className="w-full flex justify-between ">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-1 mb-[40px]"
                  color="primary"
                  variant="outlined"
                />

                <DoneIcon
                  className=" translate-y-1 cursor-pointer hover:bg-slate-400 rounded-sm ml-3"
                  onClick={handleEditTitleConfirm}
                />
              </div>
            )}
            <SettingsIcon
              sx={{
                marginLeft: "10px",
                cursor: "pointer",
                transform: "translateY(3px)",
              }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleEditTitleClick}>
                <EditIcon sx={{ marginRight: "5px" }} />
                Edit Title
              </MenuItem>
              <MenuItem onClick={handleEditDescriptionClick}>
                <EditIcon sx={{ marginRight: "5px" }} />
                Edit Description
              </MenuItem>
              <MenuItem onClick={handleImageDialogOpen}>
                <UploadIcon sx={{ marginRight: "5px" }} />
                New Classroom Image
              </MenuItem>
              <MenuItem onClick={() => setOpenDeleteClassroomDialog(true)}>
                <DeleteIcon sx={{ marginRight: "5px" }} />
                Delete Classroom
              </MenuItem>
            </Menu>
          </div>
          <div className="w-[300px]">
            {!isEdittingDescription ? (
              <Typography variant="subtitle2">
                {classroomData.description}
              </Typography>
            ) : (
              <div className="w-full flex justify-between ">
                <TextField
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full  resize-none"
                  color="primary"
                  multiline={true}
                />
                <DoneIcon
                  className=" translate-y-1 cursor-pointer hover:bg-slate-400 rounded-sm ml-3"
                  onClick={handleEditDescriptionConfirm}
                />
              </div>
            )}
          </div>

          <List
            sx={{ width: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <DndContext collisionDetection={closestCorners}>
              <SortableContext
                items={classroomData.sections}
                strategy={verticalListSortingStrategy}
              >
                {classroomData.sections.map((section) => {
                  return (
                    <Section
                      id={section._id}
                      key={section._id}
                      section={section}
                      classroomId={classroomData._id}
                      reloadClassroomData={() => setReload((prev) => !prev)}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
            {isAddingSection && <AddSection />}
            <div
              className="text-center cursor-pointer mt-5 text-gray-400 hover:text-gray-800"
              onClick={() => setIsAddingSection(true)}
            >
              <AddCircleOutlineIcon sx={{ marginRight: "5px" }} />
              Add Section
            </div>
          </List>
        </>
      )}

      <Dialog
        open={openImageDialog}
        onClose={handleImageDialogClose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Classroom Image</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Recommended Image Size: 1920 * 1080 (16:9)
          </DialogContentText>
          <DialogContentText>
            {image ? "Preview" : "Current Image"}
          </DialogContentText>
          <div className="flex justify-around">
            <Card className="p-3 w-[500px]">
              {image ? (
                image
              ) : (
                <img src={classroomData.imageURL} alt="classroom" />
              )}
            </Card>

            <div className="flex flex-col ml-3 justify-center  items-center w-[200px]">
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <input
                  type="file"
                  accept="jpeg jpg png"
                  name="classroomImage"
                  onChange={handleFileUpload}
                  required
                  hidden
                />
              </Button>
              {image && (
                <Typography
                  variant="caption"
                  sx={{ marginLeft: "10px", color: "#6c757d" }}
                >
                  {file.name + " (" + parseInt(file.size / 1000) + "KB)"}
                </Typography>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose}>Cancel</Button>
          <Button onClick={handleImageSubmit} disabled={!image}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteClassroomDialog}
        onClose={() => setOpenDeleteClassroomDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
          Alert! This is an destructive action
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this classroom?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteClassroomDialog(false)}>
            No
          </Button>
          <Button onClick={handleDeleteClassroom} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Sidebar;
