import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Failure() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Payment Failed!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Unfortunately, your payment could not be processed. Please try again.
      </Typography>
      <Button variant="contained" color="error" onClick={() => navigate("/profile")}>
        Try Again
      </Button>
    </Box>
  );
}
