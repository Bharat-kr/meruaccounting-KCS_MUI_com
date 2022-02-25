import * as React from "react";
import { Box, Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function SelectGroup({ setGroup }) {
  const selectGroupOptions = [
    { title: "Group by employee", value: "E" },
    { title: "Group by project", value: "P" },
    { title: "Detailed", value: "D" },
    { title: "Group by Apps & URLs", value: "A" },
  ];

  const [value, setvalue] = React.useState([
    selectGroupOptions[1].title,
    selectGroupOptions[0].title,
  ]);
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
            setvalue([
              selectGroupOptions[1].title,
              selectGroupOptions[0].title,
            ]);
          }}
        >
          Summary by project
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log("two");
            setvalue([
              selectGroupOptions[0].title,
              selectGroupOptions[1].title,
            ]);
          }}
        >
          Summary by employee
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log("two");
            setvalue([selectGroupOptions[2].title]);
          }}
        >
          Detailed
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log("two");
            setvalue([selectGroupOptions[3].title]);
          }}
        >
          Apps & URLs
        </Typography>
      </Box>
      <Autocomplete
        disabled
        multiple
        id="tags-readOnly"
        options={selectGroupOptions.map((option) => option.title)}
        value={value}
        readOnly
        renderInput={(params) => (
          <TextField {...params} label="Group By" placeholder="" />
        )}
      />
    </Box>
  );
}
