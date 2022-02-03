import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import Switch from "@mui/material/Switch";

export default function IntExt({ setInternal }) {
  const [intColor, setintColor] = useState("black");
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 1 }}
    >
      <Typography variant="h6" sx={{ color: intColor }}>
        Show Interal Activites
      </Typography>
      <Switch
        onClick={(e) => {
          setInternal(e.target.checked);
          setintColor((prev) => (prev === "black" ? "primary.main" : "black"));
        }}
      />
    </Box>
  );
}
