import * as React from "react";
import { Box, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { loginContext } from "../../contexts/LoginContext";

export default function SelectEmployees({ options, setEmployees }) {
  const [value, setvalue] = React.useState([]);
  const { loginC } = React.useContext(loginContext);
  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        disabled={loginC?.userData?.role === "employee"}
        defaultValue={
          loginC?.userData?.role === "employee"
            ? [
                {
                  _id: loginC?.userData?._id,
                  name: loginC?.userData?.firstName,
                },
              ]
            : []
        }
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
