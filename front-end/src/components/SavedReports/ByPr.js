"use strict";

import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";

import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { reportsContext } from "../../contexts/ReportsContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function ByPr() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { savedReports } = React.useContext(reportsContext);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Project",
      minWidth: 300,
      rowGroup: true,

      cellRenderer: function (params) {
        return <span style={{ marginLeft: 10 }}>{params.value}</span>;
      },
    },
    {
      field: "Employee",
      minWidth: 100,
    },
    { field: "Duration", minWidth: 100 },
    { field: "Activity", minWidth: 100 },
    { field: "Money", minWidth: 100 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);
  React.useEffect(() => {
    console.log(savedReports.reports[0]?.byPR);

    let arr = [];
    savedReports.reports[0]?.byPE?.map((pro) => {
      pro.users.map((emp) => {
        arr.push({
          Project: `${
            pro.client[0]?.name ? pro?.client[0].name : "Deleted client"
          } :
              ${
                pro.project[0]?.name ? pro?.project[0]?.name : "Deleted project"
              }`,

          Employee: `${emp.firstName} ${emp.lastName}`,
          Duration: `${(emp.totalHours / 3600).toFixed(2)} hr`,
          Money: ((emp?.totalHours / 3600) * emp?.payRate).toFixed(2),
          Activity: emp.performanceData,
        });
      });
    });
    setRowData(arr);
  }, [savedReports]);
  const onGridReady = useCallback((savedReports) => {}, []);

  return (
    <div style={{ height: "70vh" }}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          style={{ height: "70vh" }}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupDisplayType={"groupRows"}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}
