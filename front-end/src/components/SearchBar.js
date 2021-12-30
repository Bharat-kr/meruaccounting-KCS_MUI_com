import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function SearchBar(props) {
  return (
    <Box
      sx={{
        maxWidth: "95%",
        width: "auto",
        flexGrow: "1",
        "& .MuiTextField-root": { m: 1, mb: 2 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Autocomplete
          onChange={props.handleSearch}
          disablePortal
          id="combo-box-demo"
          options={props.options}
          renderInput={(params) => (
            <TextField {...params} fullWidth label={props.label} />
          )}
        />
      </div>
    </Box>
  );
}
