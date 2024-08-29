import React, { useState, useEffect } from "react";
import axios from "axios";
import ServerCard from "./ServerCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ServerBrowser() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "8jbC15BddAAx";
  const apiKeySecret = "mGb0o74t2S7PR8RhsHFAMgwAmkB3N2X5";
  const userID = "8affcdbc16fc4910acb8a6dc268cd7ed";
  const workerUrl = "https://main-worker.educationaltools-io.workers.dev";

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.post(`${workerUrl}/api/public/get_kasms`, {
          api_key: apiKey,
          api_key_secret: apiKeySecret,
          user_id: userID,
        });
        setServers(response.data.kasms);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const findAndJoinServer = async () => {
    const availableServer = servers.find((server) => server.server.status === "free");
    if (availableServer) {
      try {
        const requestResponse = await axios.post(`${workerUrl}/api/public/request_kasm`, {
          api_key: apiKey,
          api_key_secret: apiKeySecret,
          user_id: userID,
          image_id: availableServer.server.image_id,
          enable_sharing: true,
        });

        const { share_id, status } = requestResponse.data;

        if (status !== "running") {
          await waitForSessionToRun(share_id);
        }

        const joinResponse = await axios.post(`${workerUrl}/api/public/join_kasm`, {
          api_key: apiKey,
          api_key_secret: apiKeySecret,
          user_id: userID,
          share_id: share_id,
        });

        const joinUrl = joinResponse.data.kasm_url;
        const fullUrl = `https://52.14.144.0${joinUrl}`;

        window.open(fullUrl, "_blank");
      } catch (error) {
        console.error("Failed to join server:", error);
        alert("Failed to join the server. Please try again.");
      }
    } else {
      alert("No available servers at the moment.");
    }
  };

  const waitForSessionToRun = async (share_id) => {
    let status = "starting";
    while (status !== "running") {
      try {
        const statusResponse = await axios.post(`${workerUrl}/api/public/get_kasm_status`, {
          api_key: apiKey,
          api_key_secret: apiKeySecret,
          share_id: share_id,
        });
        status = statusResponse.data.status;
        if (status !== "running") {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      } catch (error) {
        console.error("Error while checking Kasm session status:", error);
        break;
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Quick Launch
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }} onClick={findAndJoinServer}>
        Find Server
      </Button>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Available Servers
      </Typography>
      {servers.map((server) => (
        <ServerCard key={server.server.hostname} name={server.server.hostname} location={server.server.zone_name} status={server.server.status} />
      ))}
    </Box>
  );
}
