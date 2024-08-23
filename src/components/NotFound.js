import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <img src="/logoconstruction.png" alt="Under Construction" style={{ width: "50%", maxWidth: "300px", height: "auto" }} />
      <Typography variant="body1" gutterBottom>
        Sorry, the page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
