// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="/static/meru1024.svg"
      sx={{
        width: 210,
        backgroundColor: "white",
      }}
    />
  );
}
