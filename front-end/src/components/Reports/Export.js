import * as React from "react";
import { useRef, useState, useEffect, useCallback } from "react";

// import "@progress/kendo-theme-material/dist/all.css";
// import "./style.css";
import { Box, Typography } from "@mui/material";
import ByEp from "./ByEp";
import ByPr from "./ByPr";
import ByCl from "./ByCL";
import ByDetailed from "./ByDetailed";
import ByAppsUrl from "./ByApp&Url";
import { reportsContext } from "../../contexts/ReportsContext";
import Graphs from "./Graphs";
import { lastIndexOf } from "lodash";
import { GridPDFExport } from "@progress/kendo-react-pdf";

import { Button } from "@progress/kendo-react-buttons";
// import { TreeListPDFExport } from "@progress/kendo-react-pdf";
// import { treeListSampleEmployees } from "./treelist-sample-employees.jsx";

export default function PdfExport(props) {
  console.log(props);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const pdfExportRef = useRef(null);

  const expandField = "expanded";
  const subItemsField = "employees";

  const { savedReports } = React.useContext(reportsContext);

  // variable for date, employees, and projects
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setOptions(savedReports?.data[0]);
    pdfex();
  }, [savedReports]);
  const pdfex = useCallback(() => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
      console.log(pdfExportRef.current);
    }
  }, []);

  //   useEffect(() => {
  //     // setData(treeListSampleEmployees);
  //     // setExpanded([1, 2, 32]);
  //   }, []);

  /*
    This function takes in the current "dataTree", which currently is just our data from the
    `treelist-sample-employees.jsx` file. Then, it goes through our current expanded items
    (1, 2, and 32) and uses the mapTree() helper method to create a new array that the TreeList
    can use, now including designated subItemsField, `employees` in our case, (this determines if there)
    are child data items, and also adds the `expanded` field to each item, checking if the item's ID is the same
    as any of the items in the `expanded` array (1, 2, or 32 in our case).

    This new and transformed hierarchical data structure is then returned to out TreeList, letting the component
    have a set of pre-expanded data items.
  */
  //   const addExpandField = (dataTree) => {
  //     const currentExpanded = expanded;
  //     return mapTree(dataTree, subItemsField, (item) =>
  //       extendDataItem(item, subItemsField, {
  //         [expandField]: currentExpanded.includes(item.id),
  //       })
  //     );
  //   };

  //   const processData = () => {
  //     return addExpandField(data);
  //   };

  /*
    This event checks if the current is expanded (event.value === true) or is collapsed
    (event.value === false). If it's true we simply filter out the item from our expanded array since
    we should not collapse the item. If the current item is instead collapsed, we now want to expand it
    by adding the dataItem's id to our existing list `expandedList`
  */
  //   const onExpandChange = useCallback(
  //     (event) => {
  //       let expandedList = expanded;
  //       expandedList = event.value
  //         ? expandedList.filter((id) => id !== event.dataItem.id)
  //         : [...expandedList, event.dataItem.id];
  //       setExpanded(expandedList);
  //     },
  //     [expanded]
  //   );

  //   const treeListColumns = [
  //     {
  //       field: "name",
  //       title: "Name",
  //       width: 250,
  //       expandable: true,
  //     },
  //     {
  //       field: "hireDate",
  //       title: "Hire Date",
  //       width: 200,
  //     },
  //     {
  //       field: "timeInPosition",
  //       title: "Year(s) in Position",
  //       width: 200,
  //     },
  //     {
  //       field: "fullTime",
  //       title: "Full Time",
  //       width: 100,
  //     },
  //   ];

  //   const treeListElement = (
  //     <TreeList
  //       data={processData()}
  //       columns={treeListColumns}
  //       expandField={expandField}
  //       subItemsField={subItemsField}
  //       onExpandChange={onExpandChange}
  //       toolbar={
  //         <TreeListToolbar>
  //           <Button icon="pdf" onClick={onPdfExport} disabled={isPdfExporting} />
  //         </TreeListToolbar>
  //       }
  //     />
  //   );

  return (
    <GridPDFExport ref={pdfExportRef} options={savedReports.options}>
      {savedReports?.data[0] ? (
        <Box sx={{ width: "100%", scroll: "visible" }}>
          {options?.user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                heigth: "5rem",
                width: "100%",
              }}
            >
              <Typography variant="h3" sx={{ color: "color.primary" }}>
                {options.user.firstName} {options.user.lastName}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Name:</Typography>
                <Typography
                  varinat=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Date range:</Typography>
                <Typography
                  varinat=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.dateOne
                    ? `${options.options.dateOne}-`
                    : "Till "}
                  {options.options.dateTwo}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Employees : </Typography>
                <Typography
                  varinat="h6"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.userIds === []
                    ? options.options.userIds?.map((user, index) =>
                        index === lastIndexOf(options.options.userIds) - 1
                          ? ` ${user.name} .`
                          : ` ${user.name} ,`
                      )
                    : "All Employees"}
                  {/*  : options.options.userIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Projects:</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.projectIds === []
                    ? options.options.projectIds.map((user, index) =>
                        index === lastIndexOf(options.options.projectIds) - 1
                          ? ` ${user.name} .`
                          : ` ${user.name} ,`
                      )
                    : "All Projects"}
                  {/* : options.options.projectIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Group by:</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.groupBy === "E"
                    ? "Group by employee"
                    : options.options.groupBy === "P"
                    ? "Group by project"
                    : options.options.groupBy === "C"
                    ? "Group by clients "
                    : options.options.groupBy === "A"
                    ? "Group by apps&url"
                    : options.options.groupBy === "D"
                    ? "Group by details"
                    : ""}
                </Typography>
              </Box>
            </Box>
          )}
          <Graphs style={{ margin: 10 }} options={options}></Graphs>
          {options?.options.groupBy === "E" ? (
            <ByEp sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "P" ? (
            <ByPr sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "C" ? (
            <ByCl sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "D" ? (
            <ByDetailed sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "A" ? (
            <ByAppsUrl sx={{ height: "auto" }} options={options} />
          ) : (
            ""
          )}
        </Box>
      ) : null}
    </GridPDFExport>
  );
}
