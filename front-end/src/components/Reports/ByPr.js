import React from "react";
import { useEffect, useState } from "react";
import { groupBy as rowGrouper, random } from "lodash";
import faker from "faker";
import { reportsContext } from "src/contexts/ReportsContext";

import DataGrid, { SelectColumn } from "react-data-grid";
import { Box, Typography } from "@mui/material";
import { fontSize } from "@mui/system";

const columns = [
  {
    key: "employee",
    name: "Employee",
  },
  {
    key: "project",
    name: "Project",
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
    // groupFormatter({ childRows }) {
    //   return (
    //     <>
    //       {childRows.reduce(
    //         (prev, { activity }) => Number((prev + activity).toFixed(2)),
    //         0
    //       )}
    //     </>
    //   );
    // },
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
  return row.id;
}

const options = ["employee", "project"];

export default function ByEp(props) {
  const { reports } = props;

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([options[1]]);
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set(["Projects"])
  );
  React.useEffect(() => {
    let arr = [];
    reports.reports[0]?.byPE?.map((pro) => {
      pro.users.map((emp) => {
        arr.push({
          id: pro._id.project + random(100),
          project: `${
            pro.client[0]?.name ? pro?.client[0].name : "Deleted client"
          } :
              ${
                pro.project[0]?.name ? pro?.project[0]?.name : "Deleted project"
              }`,

          employee: `${emp.firstName} ${emp.lastName}`,
          duration: Number((emp.totalHours / 3600).toFixed(2)),
          money: Number((emp?.toalHours / 3600 / emp?.payRate).toFixed(2)),
          activity: emp.performanceData,
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

  return (
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
  );
}
