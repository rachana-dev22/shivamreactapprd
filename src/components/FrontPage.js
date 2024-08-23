import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { signInWithGoogle } from "../auth";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
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
            <Button startIcon={<LoginIcon />} variant="contained" color="primary" className="custom-button" onClick={handleJoinNowClick} sx={{ marginRight: 1 }}>
              Join Now
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="hero-section">
        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Box className="hero-text">
          <Box className="hero-title-wrapper">
            <img src="/128.png" alt="Logo" className="hero-logo" />
            <Typography variant="h2" component="div" className="hero-title">
              EDUTOOLS
            </Typography>
          </Box>
          <Typography variant="h5" component="div" className="hero-slogan" sx={{ fontFamily: "Mulish, sans-serif", fontWeight: 400, marginTop: 1 }}>
            All Your Educational Tools in One Hub
          </Typography>
        </Box>
        <Box className="video-embed">
          <iframe src="https://www.youtube.com/embed/BZNq7-WcEzw?autoplay=1&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playlist=BZNq7-WcEzw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="EduTools Introduction" />
        </Box>
        <Button variant="contained" color="primary" className="join-now-button" onClick={handleJoinNowClick}>
          Take the Next Step, Join Us Today!
        </Button>
      </Box>
      <Box className="service-section">
        <Typography variant="h3" component="div" className="service-title">
          Your Path to Success
        </Typography>
        <Typography variant="h6" component="div" className="service-subtitle">
          Discover how EduTools can help you become a straight-A student.
        </Typography>
        <Box className="package-container">
          <Typography variant="h4" component="div" className="package-title">
            What We Offer
          </Typography>
          <ul className="package-list">
            <li>Access to Exclusive Premium Educational Resources to Elevate Your Learning</li>
            <li>Round-the-Clock Support from Expert Tutors and Mentors, Anytime You Need It</li>
            <li>Join a Thriving Student Community Dedicated to Academic Excellence</li>
            <li>Engage in Active Discussions with Peers through Our Public Chat Platform</li>
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
            "EduTools helped me turn my grades around in calculus. I went from struggling to an A-."
            <Typography variant="body2" className="reviewer">
              Ethan Martinez, University of Texas at Austin, Sophomore
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "The daily planner and peer sessions have been a game-changer for managing my workload."
            <Typography variant="body2" className="reviewer">
              Priya Patel, University of Florida, Junior
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "EduTools helped me stay on top of my engineering projects and meet deadlines."
            <Typography variant="body2" className="reviewer">
              Michael Zhang, Purdue University, Mechanical Engineering Major
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "I went from feeling overwhelmed to getting solid B's with EduTools."
            <Typography variant="body2" className="reviewer">
              Aisha Williams, San Diego State University, Sophomore
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "The personalized study plans helped me balance pre-med studies and extracurriculars."
            <Typography variant="body2" className="reviewer">
              Sofia Hernandez, University of Arizona, Pre-Med
            </Typography>
          </Box>
          <Box className="review">
            <Box className="stars">★★★★★</Box>
            "EduTools' mock tests and guides gave me the confidence to improve my grades."
            <Typography variant="body2" className="reviewer">
              David Kim, Ohio State University, Economics Major
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
        <Typography variant="body1">© 2024 EduTools. All rights reserved.</Typography>
      </Box>
    </>
  );
}
