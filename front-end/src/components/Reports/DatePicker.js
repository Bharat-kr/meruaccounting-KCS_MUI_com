import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import dayjs from "dayjs";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Typography } from "@mui/material";

export default function BasicDateRangePicker({ setDate }) {
  const [value, setValue] = useState([null, null]);
  const [timeRange, setTimeRange] = useState("Custom");
  const typoStyle = {
    m: 1,
    opacity: 0.6,
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  };
  React.useEffect(() => {
    console.log(value);
    setDate(value);
  }, [value]);

  // console.log(dayjs().startOf("year").subtract(1, "year"));
  // dayjs().add(-1, "day")
  // dayjs() .startOf("month")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setValue([dayjs(), dayjs()]);
            setTimeRange("Today");
          }}
        >
          Today
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setValue([dayjs().startOf("week"), dayjs()]);
            setTimeRange("This week");
          }}
        >
          This week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setValue([dayjs().startOf("month"), dayjs()]);
            setTimeRange("This month");
          }}
        >
          This month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setValue([dayjs().startOf("year"), dayjs()]);
            setTimeRange("This year");
          }}
        >
          This year
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log(dayjs().add(-1, "day"));
            setValue([dayjs().add(-1, "day"), dayjs().add(-1, "day")]);
            setTimeRange("Yesterday");
          }}
        >
          Yesterday
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log(dayjs().add(-1, "day"));
            setValue([
              dayjs().startOf("week").subtract(1, "week"),
              dayjs().endOf("week").subtract(1, "week"),
            ]);
            setTimeRange("Last week");
          }}
        >
          Last week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log(dayjs().add(-1, "day"));
            setValue([
              dayjs().startOf("month").subtract(1, "month"),
              dayjs().endOf("month").subtract(1, "month"),
            ]);
            setTimeRange("Last month");
          }}
        >
          Last month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            console.log(dayjs().add(-1, "day"));
            setValue([
              dayjs().startOf("year").subtract(1, "year"),
              dayjs().endOf("year").subtract(1, "year"),
            ]);
            setTimeRange("Last year");
          }}
        >
          Last year
        </Typography>
      </Box>
      <DateRangePicker
        inputFormat="DD/MM/YYYY"
        startText="Start Date"
        endText="End Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setTimeRange("Custom");
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> till </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
      <Typography sx={{ ml: 0.5, mb: 3, mt: 0.5 }} variant="subtitle2">
        ({timeRange})
      </Typography>
    </LocalizationProvider>
  );
}
