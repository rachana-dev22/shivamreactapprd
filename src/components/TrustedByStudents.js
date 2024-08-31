import React from "react";
import Box from "@mui/material/Box";

export default function TrustedByStudents() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginTop: "2em",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            animation: "scroll 30s linear infinite",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "inline-block" }}>
            <img src="/university-logos/stanford.png" alt="Stanford" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/berkeley.png" alt="UC Berkeley" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/ucla.png" alt="UCLA" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/usc.png" alt="USC" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/nyu.png" alt="NYU" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/duke.png" alt="Duke" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/wake-forest.png" alt="Wake Forest" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/purdue.png" alt="Purdue" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/ucsd.png" alt="UC San Diego" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/uc-irvine.png" alt="UC Irvine" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/uc-davis.png" alt="UC Davis" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/dartmouth.png" alt="Dartmouth" style={{ height: "50px", marginRight: "3em" }} />
          </Box>

          <Box sx={{ display: "inline-block" }}>
            <img src="/university-logos/stanford.png" alt="Stanford" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/berkeley.png" alt="UC Berkeley" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/ucla.png" alt="UCLA" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/usc.png" alt="USC" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/nyu.png" alt="NYU" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/duke.png" alt="Duke" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/wake-forest.png" alt="Wake Forest" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/purdue.png" alt="Purdue" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/ucsd.png" alt="UC San Diego" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/uc-irvine.png" alt="UC Irvine" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/uc-davis.png" alt="UC Davis" style={{ height: "50px", marginRight: "3em" }} />
            <img src="/university-logos/dartmouth.png" alt="Dartmouth" style={{ height: "50px", marginRight: "3em" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
