import * as React from "react";
import { Box, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function SelectEmployees({ options, setEmployees }) {
  const [value, setvalue] = React.useState([]);
  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => `${option.name} `}
        filterSelectedOptions
        onChange={(e, value) => {
          setEmployees(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Employees"
            // placeholder="Select Employees"
          />
        )}
      />
    </Box>
  );
}
