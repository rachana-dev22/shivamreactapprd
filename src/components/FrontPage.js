import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { signInWithGoogle } from "../auth";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrustedByStudents from "./TrustedByStudents";

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
      <AppBar sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderBottom: "0px solid #e0e0e0", padding: "0 1vh", backdropFilter: "blur(10px)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Toolbar>
          <img src="/128.png" alt="Logo" style={{ width: 37, height: 37, marginRight: 8 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "#000000", fontFamily: "Radio Canada Big, sans-serif", fontWeight: 550 }}>
            EduTools
          </Typography>
          <Box>
            <Button
              startIcon={<LoginIcon />}
              variant="contained"
              color="primary"
              onClick={handleJoinNowClick}
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
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: "url(/herobackgroundnew.png)",
          position: "relative",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          textAlign: "center",
          paddingTop: "100px",
          paddingBottom: "50px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(to bottom, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2))",
            borderRadius: "20px",
            boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0, 0, 0, 0.5)",
            padding: "40px",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            width: "70%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src="/128.png"
                alt="Logo"
                style={{
                  width: "10vw",
                  height: "10vw",
                  maxWidth: "80px",
                  maxHeight: "80px",
                  minHeight: "60px",
                  minWidth: "60px",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontFamily: "Mulish, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  textShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
                  fontSize: "4rem",
                  "@media (max-width: 600px)": {
                    fontSize: "2.7rem",
                  },
                }}
              >
                EDUTOOLS
              </Typography>
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: "Mulish, sans-serif",
                fontWeight: 400,
                fontSize: "1.6rem",
                color: "#ffffff",
                textAlign: "center",
                marginTop: 1,
                textShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
                "@media (max-width: 600px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              All Your Educational Tools in One Hub
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              padding: "0 20px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <iframe title="Welcome to EduTools" src="https://www.youtube.com/embed/BZNq7-WcEzw?autoplay=1&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playlist=BZNq7-WcEzw" style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinNowClick}
            startIcon={<RocketLaunchIcon />}
            sx={{
              background: "#0061f2",
              color: "white",
              fontWeight: 500,
              borderRadius: "50px",
              padding: "16px 40px",
              fontSize: "1.5rem",
              boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0,118,255,0.39)",
              border: "2px solid #3388ff",
              marginTop: 4,
              "@media (max-width: 600px)": {
                fontSize: "1.2rem",
                padding: "12px 30px",
              },
              "&:hover": {
                boxShadow: "inset 0 0px 10px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0,118,255,0.23)",
                background: "#0061f2",
                border: "2px solid #ffffff",
              },
            }}
          >
            Join Us Today!
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          background: "rgb(230, 236, 255)",
          textAlign: "center",
          padding: "4em 2em",
          boxShadow: "inset 0 0px 30px 0 rgba(0, 0, 0, 0.4), 0 0px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "#0080ff",
            marginBottom: "0.1em",
            fontFamily: "Mulish, sans-serif",
          }}
        >
          Your Path to Success
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "1.2rem",
            color: "#3b3b3b",
            marginBottom: "2em",
            fontFamily: "Mulish, sans-serif",
          }}
        >
          Discover how EduTools can help you become a straight-A student.
        </Typography>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #4aa8ff, #2384e5)",
            borderRadius: "16px",
            padding: "2em",
            color: "white",
            maxWidth: "300px",
            margin: "0 auto",
            fontFamily: "Mulish, sans-serif",
            boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 0px 8px rgba(0, 0, 0, 0.4)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 0px 8px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#2a90ff",
            },
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1em",
            }}
          >
            What We Offer
          </Typography>
          <ul
            style={{
              listStyleType: "disc",
              padding: 0,
              marginBottom: "1.5em",
              marginLeft: "1em",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1rem", marginBottom: "0.5em", position: "relative", paddingLeft: "10px" }}>Access to Exclusive Premium Educational Resources to Elevate Your Learning</li>
            <li style={{ fontSize: "1rem", marginBottom: "0.5em", position: "relative", paddingLeft: "10px" }}>Round-the-Clock Support from Expert Tutors and Mentors, Anytime You Need It</li>
            <li style={{ fontSize: "1rem", marginBottom: "0.5em", position: "relative", paddingLeft: "10px" }}>Join a Thriving Student Community Dedicated to Academic Excellence</li>
            <li style={{ fontSize: "1rem", marginBottom: "0.5em", position: "relative", paddingLeft: "10px" }}>Engage in Active Discussions with Peers through Our Public Chat Platform</li>
          </ul>
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinNowClick}
            sx={{
              background: "linear-gradient(to bottom, #ffffff, #f0f0f0, #e0e0e0)",
              color: "#223f5d",
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: "4px",
              textTransform: "none",
              fontFamily: "Mulish, sans-serif",
              boxShadow: "inset 0 0px 4px rgba(0, 0, 0, 0.5), 0 4px 14px rgba(0, 0, 0, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "inset 0 0px 4px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4)",
                background: "linear-gradient(to bottom, #ffffff, #f0f0f0, #e0e0e0)",
              },
            }}
          >
            UPGRADE NOW
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundImage: "url(/herobackgroundnewblurred.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "4em 2em",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "0.5em",
            fontFamily: "Mulish, sans-serif",
          }}
        >
          Countless Student Results
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "1.2rem",
            color: "#f0f0f0",
            marginBottom: "2em",
            fontFamily: "Mulish, sans-serif",
          }}
        >
          Trusted by students from top universities worldwide.
          <TrustedByStudents />
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "20px",
            maxWidth: "1000px",
            margin: "2em auto",
            "@media (max-width: 768px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 480px)": {
              gridTemplateColumns: "repeat(1, 1fr)",
              gridTemplateRows: "repeat(3, auto)",
            },
          }}
        >
          <Box
            sx={{
              padding: "1em",
              boxSizing: "border-box",
              borderRadius: "16px",
              backgroundColor: "white",
              color: "#223f5d",
              textAlign: "center",
              fontSize: "1.2rem",
              boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 10px rgba(255, 255, 255, 0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              fontFamily: "Mulish, sans-serif",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 30px rgba(255, 255, 255, 0.6)",
              },
            }}
          >
            <Box sx={{ fontSize: "1.5rem", color: "gold", marginBottom: "0.5em", fontFamily: "Mulish, sans-serif" }}>★★★★★</Box>
            "EduTools helped me turn my grades around in calculus. I went from struggling to an A-."
            <Typography variant="body2" sx={{ fontSize: "1rem", color: "#555", marginTop: "0.5em", display: "block", fontFamily: "Mulish, sans-serif" }}>
              Ethan Martinez, University of Texas at Austin, Sophomore
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1em",
              boxSizing: "border-box",
              borderRadius: "16px",
              backgroundColor: "white",
              color: "#223f5d",
              textAlign: "center",
              fontSize: "1.2rem",
              boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 30px rgba(255, 255, 255, 0.6)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              fontFamily: "Mulish, sans-serif",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 30px rgba(255, 255, 255, 0.6)",
              },
            }}
          >
            <Box sx={{ fontSize: "1.5rem", color: "gold", marginBottom: "0.5em", fontFamily: "Mulish, sans-serif" }}>★★★★★</Box>
            "The daily planner and peer sessions have been a game-changer for managing my workload."
            <Typography variant="body2" sx={{ fontSize: "1rem", color: "#555", marginTop: "0.5em", display: "block", fontFamily: "Mulish, sans-serif" }}>
              Priya Patel, University of Florida, Junior
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1em",
              boxSizing: "border-box",
              borderRadius: "16px",
              backgroundColor: "white",
              color: "#223f5d",
              textAlign: "center",
              fontSize: "1.2rem",
              boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 30px rgba(255, 255, 255, 0.6)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              fontFamily: "Mulish, sans-serif",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "inset 0 0px 10px 0 rgb(0, 0, 0, 0.5), 0 0px 30px rgba(255, 255, 255, 0.6)",
              },
            }}
          >
            <Box sx={{ fontSize: "1.5rem", color: "gold", marginBottom: "0.5em", fontFamily: "Mulish, sans-serif" }}>★★★★★</Box>
            "EduTools helped me stay on top of my engineering projects and meet deadlines."
            <Typography variant="body2" sx={{ fontSize: "1rem", color: "#555", marginTop: "0.5em", display: "block", fontFamily: "Mulish, sans-serif" }}>
              Michael Zhang, Purdue University, Mechanical Engineering Major
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{
            marginTop: "2em",
            fontSize: "1.2rem",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "Mulish, sans-serif",
            fontWeight: 300,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          “Many students who were unsure about joining us quickly realize the
          <strong> incredible support and value</strong> we offer. Our
          <strong> resources and community</strong> are designed to help you
          <strong> excel academically</strong> and reach your goals. If you’re considering becoming a member, remember that
          <strong> taking the first step</strong> is essential to achieving success. We look forward to welcoming you into our
          <strong> thriving community</strong> and helping you become the best student you can be.”
          <br />- The EduTools Team
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginTop: "1.5em",
            fontSize: "1.2rem",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "Mulish, sans-serif",
            fontWeight: 300,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Ready to take the next step in your academic journey? Join our community of successful students today and start achieving your goals.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinNowClick}
          sx={{
            marginTop: "1.5em",
            backgroundColor: "#0061f2",
            color: "white",
            fontWeight: 500,
            borderRadius: "50px",
            padding: "16px 40px",
            fontSize: "1.5rem",
            boxShadow: "inset 0 0px 10px 0 rgba(0, 0, 0, 0.3), 0 4px 14px 0 rgba(0,118,255,0.39)",
            border: "2px solid #3388ff",
            "@media (max-width: 600px)": {
              fontSize: "1.2rem",
              padding: "12px 30px",
            },
            "&:hover": {
              boxShadow: "inset 0 0px 10px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0,118,255,0.23)",
              backgroundColor: "#0061f2",
              border: "2px solid #ffffff",
            },
          }}
        >
          Take Action, Join Now.
        </Button>
      </Box>

      <Box
        sx={{
          padding: "3em",
          backgroundColor: "rgb(230, 236, 255)",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">© 2024 EduTools. All rights reserved.</Typography>
      </Box>
    </>
  );
}
