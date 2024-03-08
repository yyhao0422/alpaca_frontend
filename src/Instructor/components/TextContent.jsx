import { Card, Typography } from "@mui/material";

function TextContent({ data }) {
  return (
    <Card sx={{ width: "750px" }}>
      <Typography
        sx={{ marginBottom: "20px", padding: "20px", fontWeight: "500" }}
        variant="h3"
      >
        {data.title}
      </Typography>
      <Typography sx={{ marginBottom: "20px", padding: "20px" }} variant="h5">
        {data.contentTitle}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}
      >
        {data.contentDescription}
      </Typography>
    </Card>
  );
}

export default TextContent;
