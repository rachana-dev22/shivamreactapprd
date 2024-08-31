import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Thank you for your purchase. Your subscription is now active.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/profile")}>
        Go to Profile
      </Button>
    </Box>
  );
}
