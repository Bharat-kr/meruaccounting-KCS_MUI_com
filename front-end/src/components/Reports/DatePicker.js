import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import dayjs from "dayjs";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Typography } from "@mui/material";

export default function BasicDateRangePicker({ setDate }) {
  const [value, setValue] = useState([null, null]);
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
            setValue([dayjs().add(-1, "day"), dayjs().add(-1, "day")]);
          }}
        >
          Last week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          // onClick={() => {
          //   console.log("two");
          //   setValue([selectGroupOptions[1]]);
          // }}
        >
          Last month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          // onClick={() => {
          //   console.log("two");
          //   setValue([selectGroupOptions[2]]);
          // }}
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
          // console.log(newValue);
          // setDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> till </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
