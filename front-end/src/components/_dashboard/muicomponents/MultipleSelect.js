import * as React from "react";
import { Box, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function SelectEmployees() {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];
  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        multiple
        options={top100Films}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
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
