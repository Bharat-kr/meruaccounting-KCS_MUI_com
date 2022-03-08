import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import { CssBaseline } from "@mui/material";

const empList = [
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    gender: "Male",
    phone: 9876543210,
    city: "Bangalore",
  },
  {
    id: 2,
    name: "Raj",
    email: "raj@gmail.com",
    gender: "Male",
    phone: 9812345678,
    city: "Chennai",
  },
  {
    id: 3,
    name: "David",
    email: "david342@gmail.com",
    gender: "Male",
    phone: 7896536289,
    city: "Bangalore",
  },
  {
    id: 4,
    name: "Sapna",
    email: "sapna436@gmail.com",
    gender: "Female",
    phone: 9087654321,
    city: "Hyderabad",
  },
];
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

function App() {
  const [data, setData] = useState(empList);
  const columns = [
    { title: "ID", field: "id", grouping: false },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Gender", field: "gender", defaultGroupOrder: 1 },
    { title: "Phone Number", field: "phone" },
    {
      title: "City",
      field: "city",
      defaultGroupOrder: 0,
      defaultGroupSort: "desc",
    },
  ];

  return (
    <Paper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <h1 align="center">React-App</h1>
      <h4 align="center">Grouping in Material table</h4> */}
        <MaterialTable
          title="Employee Data"
          data={data}
          columns={columns}
          options={{
            grouping: true,
          }}
        />
      </ThemeProvider>
    </Paper>
  );
}
