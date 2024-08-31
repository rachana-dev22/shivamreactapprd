import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { getAuth } from "firebase/auth";
import { updatePaymentStatus } from "../util";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const verifySessionAndUpdateStatus = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (!sessionId || !user) {
        navigate("/failure"); // Redirect to failure page if session_id is missing or user is not authenticated
        return;
      }

      try {
        const response = await fetch(`/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.isValid) {
          await updatePaymentStatus(user.uid, "paid");
          console.log("Payment status updated to 'paid'");
        } else {
          navigate("/failure");
        }
      } catch (error) {
        console.error("Error verifying session or updating payment status:", error);
        navigate("/failure");
      }
    };

    verifySessionAndUpdateStatus();

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // Adjusted the confetti duration to 10 seconds

    return () => clearTimeout(timer);
  }, [location, navigate, user]);

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
      {showConfetti && <Confetti width={width} height={height} />}

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
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Thank you for your purchase. Your subscription is now active.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile")}
          sx={{
            background: "#0061f2",
            color: "white",
            fontWeight: 500,
            borderRadius: "15px",
            padding: "5px 20px",
            fontSize: "1rem",
            boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0,118,255,0.39)",
            border: "2px solid #3388ff",
            marginRight: 1,
            marginLeft: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "inset 0 0px 10px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0,118,255,0.23)",
              background: "#0061f2",
              border: "2px solid #ffffff",
            },
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
