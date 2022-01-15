import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { flexbox } from "@mui/material/node_modules/@mui/system";

export default function IntExt({ setInternal }) {
  const [intColor, setintColor] = useState("black");
  const [extColor, setextColor] = useState("primary.main");
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 1 }}
    >
      <Typography variant="h6" sx={{ color: intColor }}>
        {" "}
        External{" "}
      </Typography>
      <Switch
        defaultChecked
        onClick={(e) => {
          setInternal(e.target.checked);
          setintColor((prev) => (prev === "black" ? "primary.main" : "black"));
          setextColor((prev) => (prev === "black" ? "primary.main" : "black"));
        }}
      />
      <Typography variant="h6" sx={{ color: extColor }}>
        {" "}
        Internal{" "}
      </Typography>
    </Box>
  );
}
