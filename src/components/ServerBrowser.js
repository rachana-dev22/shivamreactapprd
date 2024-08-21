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

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.post("https://52.14.144.0/api/public/get_kasms", {
          api_key: "8jbC15BddAAx",
          api_key_secret: "mGb0o74t2S7PR8RhsHFAMgwAmkB3N2X5",
          user_id: "8affcdbc16fc4910acb8a6dc268cd7ed",
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

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Quick Launch
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }}>
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
