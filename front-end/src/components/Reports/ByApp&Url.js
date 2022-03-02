"use strict";

import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";

import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { reportsContext } from "../../contexts/ReportsContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ScreenShotRender from "./ScreenShotRender";
import timeC from "../../_helpers/timeConverter";

export default function ByAppsUrl(props) {
  const { reports } = props;

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { savedReports } = React.useContext(reportsContext);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Employee",
    },
    { field: "Application" },
    { field: "Activity" },
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
    reports.reports[0]?.byA?.map((emp) => {
      emp.screenshots.map((ss) => {
        const activity = ss.avgPerformanceData;
        arr.push({
          Employee: `${emp._id.firstName} ${emp._id.lastName}`,
          Application: ss.title.split("-").slice(0),
          Activity: (activity / 1).toFixed(2), // eslint-disable-next-line no-use-before-define
        });
      });
    });
    setRowData(arr);
  }, [reports]);

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
        ></AgGridReact>
      </div>
    </div>
  );
}
