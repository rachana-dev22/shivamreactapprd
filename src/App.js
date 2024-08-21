import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import ServerBrowser from "./components/ServerBrowser";
import ProfileTab from "./components/ProfileTab";
import ChatTab from "./components/ChatTab";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashboardLayout from "./components/DashboardLayout";
import "./css/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      {isAuthenticated && (
        <>
          <Route
            path="/launchpad"
            element={
              <DashboardLayout>
                <ServerBrowser />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <ProfileTab />
              </DashboardLayout>
            }
          />
          <Route
            path="/chat"
            element={
              <DashboardLayout>
                <ChatTab />
              </DashboardLayout>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;
