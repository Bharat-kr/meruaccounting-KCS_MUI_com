import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function SearchBar(props) {
  const inputref = React.useRef();
  const [value, setValue] = React.useState();
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
          value={value}
          // onClose={() => (inputref.current.value = "")}
          onChange={props.handleSearch}
          disablePortal
          id="combo-box-demo"
          options={props.options}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "reset") {
              setValue("");
              return;
            } else {
              setValue(newInputValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              // ref={inputref}
              // inputRef={props.inputRef}
              {...params}
              fullWidth
              label={props.label}
            />
          )}
        />
      </div>
    </Box>
  );
}
