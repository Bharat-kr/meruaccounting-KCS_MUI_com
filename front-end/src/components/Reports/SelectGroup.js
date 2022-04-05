import * as React from "react";
import { Box, Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function SelectGroup({ setGroup }) {
  const selectGroupOptions = [
    { label: "Group by employee", value: "E" },
    { label: "Group by project", value: "P" },
    { label: "Detailed", value: "D" },
    { label: "Group by Apps & URLs", value: "A" },
    { label: "Group by client", value: "C" },
  ];

  const [value, setvalue] = React.useState([selectGroupOptions[0]]);
  const typoStyle = {
    m: 1,
    opacity: 0.8,
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  };
  React.useEffect(() => {
    setGroup(value);
  }, [value]);
  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([selectGroupOptions[1]]);
          }}
        >
          Summary by project
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([selectGroupOptions[4]]);
          }}
        >
          Summary by client
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([selectGroupOptions[1]]);
          }}
        >
          Summary by employee
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([selectGroupOptions[2]]);
          }}
        >
          Detailed
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([selectGroupOptions[3]]);
          }}
        >
          Apps & URLs
        </Typography>
      </Box>
      <Autocomplete
        disabled
        multiple
        id="tags-readOnly"
        options={selectGroupOptions.map((option) => option)}
        value={value}
        readOnly
        renderInput={(params) => (
          <TextField {...params} label="Group By" placeholder="" />
        )}
      />
    </Box>
  );
}
