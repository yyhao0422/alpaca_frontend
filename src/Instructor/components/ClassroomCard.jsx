import { Card, Typography } from "@mui/material";
import alpacaLogo from "../../assets/alpacaLogo.png";
import { Link, useLocation } from "react-router-dom";

function ClassroomCard({ data }) {
  return (
    <Link
      to={"/instructor/classroom/manage/" + data._id}
      state={{ classroomData: data }}
      className=" mt-10 w-fill flex cursor-pointer group"
    >
      <Card sx={{ width: "100%", height: "100px", display: "flex" }}>
        <img src={data.imageURL} alt="classroom pictures" />
        <div className="absolute mt-9 mx-[500px] invisible group-hover:visible">
          <Typography
            variant="h6"
            sx={{
              color: "#5624d0",
              whiteSpace: "nowrap",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Manage Course
          </Typography>
        </div>
        <div className="m-3 group-hover:blur-sm">
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
            {data.description}
          </Typography>
        </div>
      </Card>
    </Link>
  );
}

export default ClassroomCard;
