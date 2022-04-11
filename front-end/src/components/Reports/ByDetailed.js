import React from "react";
import { useEffect, useState } from "react";
import { groupBy as rowGrouper, random } from "lodash";
import faker from "faker";
import { reportsContext } from "src/contexts/ReportsContext";

import DataGrid, { SelectColumn } from "react-data-grid";
import { Box, Typography, Divider } from "@mui/material";
import { fontSize } from "@mui/system";
import { timeCC } from "../../_helpers/timeConverter";
import { loginContext } from "src/contexts/LoginContext";
import { Role } from "../../_helpers/role";

function rowKeyGetter(row) {
  return Math.floor(Math.random() * 1000 * Math.random() * 200);
}

const options = ["employee", "clients"];

export default function ByAppsUrl(props) {
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
      key: "date",
      name: "Date",
    },
    {
      key: "employee",
      name: "Employee",
      // groupFormatter({ childRows }) {
      //   return (
      //     <>{childRows.reduce((prev, { employee }) => prev + employee, 0)}</>
      //   );
      // },
    },
    {
      key: "client",
      name: "Client",
    },
    {
      key: "project",
      name: "Project",
    },
    {
      key: "from",
      name: "From",
    },
    {
      key: "to",
      name: "To",
    },
    {
      key: "activity",
      name: "Activity",
      //   groupFormatter({ childRows }) {
      //     return (
      //       <>{childRows.reduce((prev, { activity }) => prev + activity, 0)}</>
      //     );
      //   },
    },
    {
      key: "duration",
      name: "Duration",
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
    reports.reports[0]?.byD?.map((d) => {
      const activity = d.performanceData;
      arr.push({
        id: d._id + random(100),
        date: d?.createdAt,
        client: `${d.client?.name ? d?.client.name : "Deleted client"}`,
        project: d.project.name,
        from: timeCC(d.startTime),
        to: timeCC(d.endTime),
        employee: `${d.employee.firstName} ${d.employee.lastName}`,
        duration: `${(d.consumeTime / 3600).toFixed(2)} hr`,
        activity: (activity / 1).toFixed(2), // eslint-disable-next-line no-use-before-define

        money: Number(
          ((d.consumeTime / 3600) * d.employee?.payRate).toFixed(2)
        ),
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

  return reports.reports[0].byD.length !== 0 ? (
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
