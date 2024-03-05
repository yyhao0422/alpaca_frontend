import { Card, Typography } from "@mui/material";
import alpacaLogo from "../../assets/alpacaLogo.png";
import { Link, useLocation } from "react-router-dom";

function ClassroomCard({ data }) {
  console.log(data);
  return (
    <Link
      to={
        "/instructor/classroom/manage/" +
        data._id +
        "/" +
        (data.sections.length !== 0 ? data.sections[0]._id : "empty") +
        "/" +
        (data.sections.length !== 0 && data.sections[0].subsections.length !== 0
          ? data.sections[0].subsections[0]._id
          : "empty")
      }
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
        <div className="m-3 group-hover:blur-3xl">
          <Typography variant="h6">{data.title}</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: "900px",
              marginTop: "10px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {data.description}
          </Typography>
        </div>
      </Card>
    </Link>
  );
}

export default ClassroomCard;
