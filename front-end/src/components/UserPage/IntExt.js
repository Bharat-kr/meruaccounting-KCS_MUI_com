import * as React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function IntExt() {
  return (
    <div style={{ padding: "8px" }}>
      Internal
      <Switch {...label} defaultChecked />
      External
    </div>
  );
}
