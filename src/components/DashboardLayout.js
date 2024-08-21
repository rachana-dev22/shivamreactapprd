import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../css/Dashboard.css";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    setIsDrawerOpen(!isMobile);
  }, [isMobile]);

  const handleTabClick = (path) => {
    navigate(path);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: isDrawerOpen ? 240 : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              { text: "Launchpad", path: "/launchpad" },
              { text: "Profile", path: "/profile" },
              { text: "Chat", path: "/chat" },
            ].map((item) => (
              <ListItem button key={item.text} onClick={() => handleTabClick(item.path)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: !isMobile && isDrawerOpen ? 0 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <AppBar className="dashboard-appbar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Welcome{user ? ", " : ""} {user ? user.displayName : ""}
            </Typography>
            {user && <Avatar src={user.photoURL} alt={user.displayName} sx={{ marginLeft: "auto", mr: 2 }} />}
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
