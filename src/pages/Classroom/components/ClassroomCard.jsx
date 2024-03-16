import { Button, Card, Typography } from "@mui/material";

import { Link } from "react-router-dom";

function ClassroomCard({ data }) {
  return (
    <Link
      to={"/classroom/" + data._id}
      state={{ classroomData: data }}
      className=" m-5 ml-0 h-[400px]  flex cursor-pointer w-[300px] "
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          justifyContent: "space-between",
        }}
      >
        <div className="flex flex-col">
          <img
            className="w-[350px]"
            src={`https://alpaca-learning-bucket.s3.ap-southeast-1.amazonaws.com/${data._id}`}
            alt="classroom pictures"
          />
          <Typography sx={{ padding: "20px" }} variant="h6">
            {data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: "900px",
              marginTop: "10px",
              maxHeight: "80px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingLeft: "20px",
            }}
          >
            {data.description}
          </Typography>
        </div>
        <Button sx={{ margin: "10px" }} variant="outlined">
          Open
        </Button>
      </Card>
    </Link>
  );
}

export default ClassroomCard;
