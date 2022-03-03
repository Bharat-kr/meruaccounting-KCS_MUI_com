"use strict";

import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";

import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { reportsContext } from "../../contexts/ReportsContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import ScreenShotRender from "./ScreenShotRender";
import timeC from "../../_helpers/timeConverter";

export default function ByDetailed(props) {
  const { reports } = props;

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { savedReports } = React.useContext(reportsContext);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      Field: "Date",
    },
    {
      field: "Employee",
      minWidth: 150,
    },
    {
      field: "Client",
    },
    { field: "Project" },
    { field: "From" },
    { field: "To" },
    {
      field: "Duration",
    },
    { field: "Activity" },
    { field: "Money" },
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
    let arr = [];
    reports.reports[0]?.byD?.map((d) => {
      const activity = d.performanceData;
      arr.push({
        Date: d?.createdAt,
        Client: `${d.client?.name ? d?.client.name : "Deleted client"}`,
        Project: d.project.name,
        From: timeC(d.startTime),
        To: timeC(d.endTime),
        Employee: `${d.employee.firstName} ${d.employee.lastName}`,
        Duration: `${(d.consumeTime / 3600).toFixed(2)} hr`,
        Activity: (activity / 1).toFixed(2), // eslint-disable-next-line no-use-before-define

        Money: ((d.consumeTime / 3600) * d.employee?.payRate).toFixed(2),
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
