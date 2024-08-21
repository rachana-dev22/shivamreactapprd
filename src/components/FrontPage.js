import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { signInWithGoogle } from "../auth";
import { useNavigate } from "react-router-dom";
import "../css/FrontPage.css";

export default function FrontPage() {
  const navigate = useNavigate();

  const handleJoinNowClick = async () => {
    try {
      const result = await signInWithGoogle();

      if (result && result.user) {
        navigate("/launchpad");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      <AppBar className="custom-appbar">
        <Toolbar>
          <img src="/128.png" alt="Logo" style={{ width: 37, height: 37, marginRight: 8 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "#000000", fontFamily: "Radio Canada Big, sans-serif", fontWeight: 550 }}>
            EduTools
          </Typography>
          <Box>
            <Button variant="contained" color="primary" className="custom-button" onClick={handleJoinNowClick}>
              Join Now
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="hero-section">
        <Box className="hero-text">
          <Box className="hero-title-wrapper">
            <img src="/128.png" alt="Logo" className="hero-logo" />
            <Typography variant="h2" component="div" className="hero-title">
              EDUTOOLS
            </Typography>
          </Box>
          <Typography variant="h5" component="div" className="hero-slogan" sx={{ fontFamily: "Mulish, sans-serif", fontWeight: 400, marginTop: 2 }}>
            The Most Resourceful Education Community
          </Typography>
        </Box>
        <Box className="video-embed">
          <iframe src="https://www.youtube.com/embed/BZNq7-WcEzw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="EduTools Introduction" />
        </Box>
        <Button variant="contained" color="primary" className="join-now-button" onClick={handleJoinNowClick}>
          Don't Hesitate, Join Now.
        </Button>
      </Box>
      <Box className="service-section">
        <Typography variant="h3" component="div" className="service-title">
          Your Path to Success
        </Typography>
        <Typography variant="h6" component="div" className="service-subtitle">
          Find out how we can help you become a straight A student.
        </Typography>
        <Box className="package-container">
          <Typography variant="h4" component="div" className="package-title">
            What We Offer
          </Typography>
          <ul className="package-list">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor incididunt</li>
            <li>Ut labore et dolore magna aliqua</li>
            <li>Quis ipsum suspendisse ultrices</li>
            <li>Gravida dictum fusce ut placerat</li>
          </ul>
          <Button variant="contained" color="primary" className="upgrade-button" onClick={handleJoinNowClick}>
            UPGRADE NOW
          </Button>
        </Box>
      </Box>
      <Box className="results-section">
        <Typography variant="h3" component="div" className="results-title">
          Countless Student Results
        </Typography>
        <Typography variant="h6" component="div" className="results-subtitle">
          Take a quick look at how we’ve been able to help others.
        </Typography>
        <Box className="reviews-grid">
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "EduTools helped me achieve straight A's!"
            <Typography variant="body2" className="reviewer">
              John Doe, Harvard University
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "The best decision I made this year."
            <Typography variant="body2" className="reviewer">
              Jane Smith, Stanford University
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "A game changer for my academic life."
            <Typography variant="body2" className="reviewer">
              Mike Johnson, MIT
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "I went from struggling to thriving!"
            <Typography variant="body2" className="reviewer">
              Emily Davis, UC Berkeley
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "Their support system is unmatched."
            <Typography variant="body2" className="reviewer">
              Sarah Brown, Yale University
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "I now feel confident in my studies."
            <Typography variant="body2" className="reviewer">
              Chris Lee, Princeton University
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" component="div" className="quote-section">
          “Many students who were unsure about joining us quickly realize the
          <strong> incredible support and value</strong> we offer. Our
          <strong> resources and community</strong> are designed to help you
          <strong> excel academically</strong> and reach your goals. If you’re considering becoming a member, remember that
          <strong> taking the first step</strong> is essential to achieving success. We look forward to welcoming you into our
          <strong> thriving community</strong> and helping you become the best student you can be.”
          <br />- The EduTools Team
        </Typography>
        <Typography variant="h6" component="div" className="cta-section">
          Ready to take the next step in your academic journey? Join our community of successful students today and start achieving your goals.
        </Typography>
        <Button variant="contained" color="primary" className="join-now-button" onClick={handleJoinNowClick}>
          Take Action, Join Now.
        </Button>
      </Box>

      <Box className="footer">
        <Typography variant="body1">© 2093 EduTools. All rights reserved.</Typography>
      </Box>
    </>
  );
}
