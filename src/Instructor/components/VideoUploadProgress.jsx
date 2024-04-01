import UploadFileIcon from "@mui/icons-material/UploadFile";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function VideoUploadProgress({ showProgress, file, uploadedFile }) {
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className="border p-3">
      <div className="flex flex-col justify-center items-center bg-blue-300 max-w-[600px] rounded-md p-3 my-3 ml-5 ">
        {showProgress && (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={file.loading} />
          </Box>
        )}
        <div className="flex mb-3">
          <UploadFileIcon />

          {uploadedFile && (
            <>
              <p className="ml-2">{uploadedFile.name}</p>
              <p className="ml-2">{uploadedFile.size}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mr-3">
          <p className="text-sm mb-3">
            {file.loading === 100
              ? "Video is compressing... Please wait.."
              : "Uploading video..."}
          </p>
          <p className="text-xs text-gray-600">
            If the file is large, it may take a while to complete.
          </p>
        </div>

        <CircularProgress color="success" />
      </div>
    </div>
  );
}

export default VideoUploadProgress;
