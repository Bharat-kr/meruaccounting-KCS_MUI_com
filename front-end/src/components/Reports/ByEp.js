// "use strict";

// import React, { useCallback, useMemo, useState } from "react";
// import { render } from "react-dom";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { reportsContext } from "../../contexts/ReportsContext";

// export default function ByEp(props) {
//   const { reports } = props;

//   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
//   const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
//   const { savedReports } = React.useContext(reportsContext);
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([
//     {
//       field: "Employee",
//       minWidth: 300,
//       rowGroup: true,

//       cellRenderer: function (params) {
//         return <span style={{ marginLeft: 10 }}>{params.value}</span>;
//       },
//     },
//     {
//       field: "Project",
//       minWidth: 100,
//     },
//     { field: "Duration", minWidth: 100 },
//     { field: "Activity", minWidth: 100 },
//     { field: "Money", minWidth: 100 },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       // marginLeft: 300,
//       flex: 1,
//       minWidth: 100,
//       sortable: true,
//       resizable: true,
//     };
//   }, []);
//   React.useEffect(() => {
//     // setRowData(savedReports.reports[0]?.byEP);

//     let arr = [];
//     reports.reports[0]?.byEP?.map((emp) => {
//       emp.projects.map((pro) => {
//         arr.push({
//           Employee: `${emp._id.firstName} ${emp._id.lastName}`,
//           Project: `${pro.project}`,
//           Duration: `${(pro.totalHours / 3600).toFixed(2)} hr`,

//           Money: ((emp?.totalHours / 3600) * emp?.payRate).toFixed(2),
//           Activity: (pro.avgPerformanceData / 1).toFixed(2),
//         });
//       });
//     });
//     setRowData(arr);
//   }, [reports]);
//   const onGridReady = useCallback((savedReports) => {}, []);

//   return (
//     <div style={{ height: "70vh" }}>
//       <div style={gridStyle} className="ag-theme-alpine">
//         <AgGridReact
//           style={{ height: "70vh" }}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={defaultColDef}
//           groupDisplayType={"groupRows"}
//           animateRows={true}
//           onGridReady={onGridReady}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";

// import DataGrid, {
//   Column,
//   Grouping,
//   GroupPanel,
//   Paging,
//   SearchPanel,
// } from "devextreme-react/data-grid";
// import CheckBox from "devextreme-react/check-box";
// import { customers } from "./data.js";

// export function ByLL() {
//   const [autoExpandAll, setAutoExpandAll] = useState(true);

//   return (
//     <div>
//       <DataGrid
//         dataSource={customers}
//         keyExpr="ID"
//         allowColumnReordering={true}
//         showBorders={true}
//       >
//         <GroupPanel visible={true} />
//         <SearchPanel visible={true} />
//         <Grouping autoExpandAll={autoExpandAll} />
//         <Paging defaultPageSize={10} />

//         <Column dataField="CompanyName" dataType="string" />
//         <Column dataField="Phone" dataType="string" />
//         <Column dataField="Fax" dataType="string" />
//         <Column dataField="City" dataType="string" />
//         <Column dataField="State" dataType="string" groupIndex={0} />
//       </DataGrid>

//       <div className="options">
//         <div className="caption">Options</div>
//         <div className="option">
//           <CheckBox
//             text="Expand All Groups"
//             value={autoExpandAll}
//             onValueChanged={() => setAutoExpandAll(!autoExpandAll)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// // import "./App.css";
// import MaterialTable from "material-table";
// import { Paper } from "@mui/material";
// // import shape from "./shape";
// // import palette from "./palette";
// // import typography from "./typography";
// // import componentsOverride from "./overrides";
// // import shadows, { customShadows } from "./shadows";
// import ThemeConfig from "src/theme";

// const empList = [
//   {
//     id: 1,
//     name: "Neeraj",
//     email: "neeraj@gmail.com",
//     gender: "Male",
//     phone: 9876543210,
//     city: "Bangalore",
//   },
//   {
//     id: 2,
//     name: "Raj",
//     email: "raj@gmail.com",
//     gender: "Male",
//     phone: 9812345678,
//     city: "Chennai",
//   },
//   {
//     id: 3,
//     name: "David",
//     email: "david342@gmail.com",
//     gender: "Male",
//     phone: 7896536289,
//     city: "Bangalore",
//   },
//   {
//     id: 4,
//     name: "Sapna",
//     email: "sapna436@gmail.com",
//     gender: "Female",
//     phone: 9087654321,
//     city: "Hyderabad",
//   },
// ];

// export function ByLL(propValue) {
//   const [data, setData] = useState(empList);
//   const columns = () => {
//     return [
//       {
//         title: "ID",
//         field: "id",
//         grouping: false,
//         cellStyle: {
//           backgroundColor: "#039be5",
//           color: "#FFF",
//           display: propValue ? "inline-block" : "block",
//         },
//       },
//       { title: "Name", field: "name" },
//       { title: "Email", field: "email" },
//       { title: "Gender", field: "gender", defaultGroupOrder: 1 },
//       { title: "Phone Number", field: "phone" },
//       {
//         title: "City",
//         field: "city",
//         defaultGroupOrder: 0,
//         defaultGroupSort: "desc",
//       },
//     ];
//   };

//   return (
//     <Paper sx={{ backgroundColor: "red" }}>
//       {/* <h1 align="center">React-App</h1>
//       <h4 align="center">Grouping in Material table</h4> */}
//       <Paper sx={{ color: "red" }}>
//         <MaterialTable
//           title="Employee Data"
//           data={data}
//           columns={columns()}
//           options={{
//             grouping: true,
//           }}
//         />
//       </Paper>
//     </Paper>
//   );
// }

import { useEffect, useState } from "react";
import { groupBy as rowGrouper } from "lodash";
import faker from "faker";

import DataGrid, { SelectColumn } from "react-data-grid";

// const groupingClassname = css`
//   display: flex;
//   flex-direction: column;
//   block-size: 100%;
//   gap: 8px;

//   > .rdg {
//     flex: 1;
//   }
// `;

// const optionsClassname = css`
//   display: flex;
//   gap: 8px;
//   text-transform: capitalize;
// `;

// interface Row {
//   id: number;
//   country: string;
//   year: number;
//   sport: string;
//   athlete: string;
//   gold: number;
//   silver: number;
//   bronze: number;
// }

const sports = [
  "Swimming",
  "Gymnastics",
  "Speed Skating",
  "Cross Country Skiing",
  "Short-Track Speed Skating",
  "Diving",
  "Cycling",
  "Biathlon",
  "Alpine Skiing",
  "Ski Jumping",
  "Nordic Combined",
  "Athletics",
  "Table Tennis",
  "Tennis",
  "Synchronized Swimming",
  "Shooting",
  "Rowing",
  "Fencing",
  "Equestrian",
  "Canoeing",
  "Bobsleigh",
  "Badminton",
  "Archery",
  "Wrestling",
  "Weightlifting",
  "Waterpolo",
  "Wrestling",
  "Weightlifting",
];

const columns = [
  SelectColumn,
  {
    key: "country",
    name: "Country",
  },
  {
    key: "year",
    name: "Year",
  },
  {
    key: "sport",
    name: "Sport",
  },
  {
    key: "athlete",
    name: "Athlete",
  },
  {
    key: "gold",
    name: "Gold",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { gold }) => prev + gold, 0)}</>;
    },
  },
  {
    key: "silver",
    name: "Silver",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    },
  },
  {
    key: "bronze",
    name: "Bronze",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    },
  },
  {
    key: "total",
    name: "Total",
    formatter({ row }) {
      return <>{row.gold + row.silver + row.bronze}</>;
    },
    groupFormatter({ childRows }) {
      return (
        <>
          {childRows.reduce(
            (prev, row) => prev + row.gold + row.silver + row.bronze,
            0
          )}
        </>
      );
    },
  },
];

function rowKeyGetter(row) {
  return row.id;
}

const options = ["country", "year", "sport", "athlete"];

export function ByLL(Props) {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1],
  ]);
  const [expandedGroupIds, setExpandedGroupIds] = useState([
    "United States of America",
    "United States of America__2015",
  ]);
  useEffect(() => {}, []);

  function toggleOption(option, enabled) {
    const index = selectedOptions.indexOf(option);
    if (enabled) {
      if (index === -1) {
        setSelectedOptions((options) => [...options, option]);
      }
    } else if (index !== -1) {
      setSelectedOptions((options) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        return newOptions;
      });
    }
    setExpandedGroupIds(new Set());
  }

  return (
    <div>
      <b>Group by columns:</b>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={(event) => toggleOption(option, event.target.checked)}
            />{" "}
            {option}
          </label>
        ))}
      </div>
      {console.log(columns, rows)}
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={selectedOptions}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
        // direction={direction}
      />
    </div>
  );
}
