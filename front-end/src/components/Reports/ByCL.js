// "use strict";

// import React, { useCallback, useMemo, useState } from "react";
// import { render } from "react-dom";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/dist/styles/ag-grid.css";

// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { reportsContext } from "../../contexts/ReportsContext";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// // import ScreenShotRender from "./ScreenShotRender";

// export default function ByCl(props) {
//   const { reports } = props;

//   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
//   const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
//   const { savedReports } = React.useContext(reportsContext);
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([
//     {
//       field: "Employee",
//       minWidth: 100,
//     },
//     {
//       field: "Client",
//       minWidth: 300,
//       rowGroup: true,

//       // cellRenderer: function (params) {
//       //   return <span style={{ marginLeft: 10 }}>{params.value}</span>;
//       // },
//     },
//     {
//       field: "Duration",
//       minWidth: 100,
//       cellRenderer: "hello",
//     },
//     { field: "Activity", minWidth: 100 },
//     { field: "Money", minWidth: 100 },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       flex: 1,
//       minWidth: 100,
//       sortable: true,
//       resizable: true,
//     };
//   }, []);
//   React.useEffect(() => {
//     let arr = [];
//     reports.reports[0]?.byCE?.map((cli) => {
//       cli.users.map((emp) => {
//         arr.push({
//           Client: `${
//             cli.client[0]?.name ? cli?.client[0].name : "Deleted client"
//           }`,

//           Employee: `${emp.firstName} ${emp.lastName}`,
//           Duration: `${(emp.totalHours / 3600).toFixed(2)} hr`,
//           Activity: emp.avgPerformanceData.toFixed(2),
//           Money: (emp?.totalHours / 3600).toFixed(2),
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

import React from "react";
import { useEffect, useState } from "react";
import { groupBy as rowGrouper, random } from "lodash";
import faker from "faker";
import { reportsContext } from "src/contexts/ReportsContext";

import DataGrid, { SelectColumn } from "react-data-grid";
import { Box, Typography, Divider } from "@mui/material";
import { fontSize } from "@mui/system";

const columns = [
  {
    key: "employee",
    name: "Employee",
  },
  {
    key: "client",
    name: "Client",
  },
  {
    key: "duration",
    name: "Duration",
    groupFormatter({ childRows }) {
      return (
        <>
          {childRows.reduce(
            (prev, { duration }) => Number((prev + duration).toFixed(2)),
            0
          )}
        </>
      );
    },
  },
  {
    key: "activity",
    name: "Activity",
    groupFormatter({ childRows }) {
      return (
        <>
          {childRows.reduce(
            (prev, { activity }) => Number((prev + activity).toFixed(2)),
            0
          )}
        </>
      );
    },
  },
  {
    key: "money",
    name: "Money",
    groupFormatter({ childRows }) {
      return (
        <>
          {childRows.reduce(
            (prev, { money }) => Number((prev + money).toFixed(2)),
            0
          )}
        </>
      );
    },
  },
];

function rowKeyGetter(row) {
  return Math.floor(Math.random() * 1000 * Math.random() * 200);
}

const options = ["employee", "client"];

export default function ByCl(props) {
  const { reports } = props;

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([options[0]]);
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set(["Employees"])
  );
  console.log(reports, "fix Money");
  React.useEffect(() => {
    let arr = [];
    reports.reports[0]?.byCE?.map((cli) => {
      cli.users.map((emp) => {
        arr.push({
          id: cli.client[0]?._id + random(100),
          client: `${
            cli.client[0]?.name ? cli?.client[0].name : "Deleted client"
          }`,

          employee: `${emp.firstName} ${emp.lastName}`,
          duration: Number((emp.totalHours / 3600).toFixed(2)),
          activity: Number(emp.avgPerformanceData.toFixed(2)),
          money: Number(((emp?.totalHours / 3600) * emp.payRate).toFixed(2)),
        });
      });
    });
    setRows(arr);
  }, [reports]);

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

  return reports.reports[0].byCE?.length !== 0 ? (
    <Box sx={{ mt: 3 }}>
      <Typography varinat="h3" sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Group by columns:
      </Typography>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              style={{ marginLeft: "1rem" }}
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={(event) => toggleOption(option, event.target.checked)}
            />{" "}
            {option}
          </label>
        ))}
      </div>
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
    </Box>
  ) : (
    <>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row", m: 10 }}>
        <Typography varinat="h1" sx={{ fontWeight: "bold" }}>
          No tracked time found matching the criteria
        </Typography>
      </Box>
    </>
  );
}
