import * as React from "react";
import { Box, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function SelectEmployees({ options, setClients }) {
  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => `${option.name} `}
        filterSelectedOptions
        onChange={(e, value) => {
          setClients(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Clients" />
        )}
      />
    </Box>
  );
}
