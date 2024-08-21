import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

export default function ServerCard({ name, location, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "green";
      case "offline":
        return "red";
      case "out of service":
        return "grey";
      default:
        return "grey";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        mb: 0.2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
          Location: {location}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography>
        <CircleIcon sx={{ color: getStatusColor(status), fontSize: 12, mr: 1 }} />
        <Button variant="contained" size="small" disabled={status !== "online"}>
          Join
        </Button>
      </Box>
    </Box>
  );
}
