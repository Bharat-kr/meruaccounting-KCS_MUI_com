import React from "react";
import { useEffect, useState } from "react";
import { groupBy as rowGrouper, random } from "lodash";
import faker from "faker";
import { reportsContext } from "src/contexts/ReportsContext";

import DataGrid, { SelectColumn } from "react-data-grid";
import { Box, Typography, Divider } from "@mui/material";
import { fontSize } from "@mui/system";
import { loginContext } from "src/contexts/LoginContext";
import { Role } from "../../_helpers/role";

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
  const { loginC } = React.useContext(loginContext);
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

    Role.indexOf(loginC.userData.role) <= 1
      ? {
          key: "money",
          name: `Money ${(<span>&#8377;</span>)}`,
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
        }
      : "",
  ];

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
