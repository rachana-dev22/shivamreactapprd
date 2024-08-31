import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Failure() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundImage: "url(/herobackgroundnewblurred.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to bottom, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.4))",
          borderRadius: "20px",
          boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0, 0, 0, 0.5)",
          padding: "40px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Payment Failed!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Unfortunately, your payment could not be processed. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/profile")}
          sx={{
            background: "#d32f2f",
            color: "white",
            fontWeight: 500,
            borderRadius: "15px",
            padding: "5px 20px",
            fontSize: "1rem",
            boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0,118,255,0.39)",
            border: "2px solid #b71c1c",
            marginRight: 1,
            marginLeft: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "inset 0 0px 10px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0,118,255,0.23)",
              background: "#d32f2f",
              border: "2px solid #ffffff",
            },
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
