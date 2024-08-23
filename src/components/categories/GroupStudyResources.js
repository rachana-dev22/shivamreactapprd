import React from "react";
import { Box, Typography } from "@mui/material";

const GroupStudyResources = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Group Study Resources
      </Typography>
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
        <img src="/logoconstruction.png" alt="Under Construction" style={{ width: "50%", maxWidth: "300px", height: "auto" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          This page is under construction.
        </Typography>
      </Box>{" "}
    </Box>
  );
};

export default GroupStudyResources;
