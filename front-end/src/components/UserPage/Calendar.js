import React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./calendar.css";
export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable,
    });
  };
  setMonth = (month) => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable,
    });
  };
  MonthList = (props) => {
    let months = [];
    props.data.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      cells.push(row);
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="100%">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearTable = (e) => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable,
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    });
  };
  setYear = (year) => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable,
    });
  };
  onYearChange = (e) => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = (props) => {
    let months = [];
    let nextten = moment().set("year", props).add("year", 12).format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      cells.push(row);
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="100%">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d,
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };
  render() {
    let dayofDate = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      dayofDate.push(
        <th key={d} className={`calendar-day ${currentDay}`}>
          {moment(`${this.year()}-${this.month()}-${d}`, "YYYY-MMMM-DD")
            .format("dddd")
            .slice(0, 3)}
        </th>
      );
    }
    let daysInMonth = [];
    let trackingData = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
          {/* <div style={{height:"15px", width: "10%", backgroundColor: "#007B55" }}></div> */}
        </td>
      );
      trackingData.push(
        <td
          className="hoursCells"
          key={d}
          style={{
            borderWidth: "0 1px 0 1px",
            borderStyle: "solid",
            borderColor:"#C4CDD5",
            height: "15px",
            pointerEvents:"none"
          }}
        >
          <div style={{height:"100%", width: `${d*3}%`, backgroundColor: "#007B55" }}></div>
        </td>
      );
    }
    let dayOfDateRow = [];
    let dayOfDateCells = [];
    var totalSlots = [...daysInMonth];
    let rows = [];
    dayofDate.forEach((row, i) => {
      dayOfDateCells.push(row);
      if (i === totalSlots.length - 1) {
        dayOfDateRow.push(dayOfDateCells);
      }
    });
    let weekdayshortname = dayOfDateRow.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });
    let cells = [];

    totalSlots.forEach((row, i) => {
      cells.push(row);
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <div className="tail-datetime-calendar">
        <Box
          className="calendar-navi"
          sx={{
            backgroundColor: "primary.main",
            "@media (max-width: 800px)": {
              width: "100%",
            },
          }}
        >
          <span
            onClick={(e) => {
              this.onPrev();
            }}
            className="calendar-button button-prev"
          >
            <ArrowLeftIcon />
          </span>
          {!this.state.showMonthTable && (
            <span
              onClick={(e) => {
                this.showMonth();
              }}
              className="calendar-label"
            >
              {this.month()}
            </span>
          )}
          <span
            className="calendar-label"
            onClick={(e) => this.showYearTable()}
          >
            {this.year()}
          </span>
          <span
            onClick={(e) => {
              this.onNext();
            }}
            className="calendar-button button-next"
          >
            <ArrowRightIcon />
          </span>
        </Box>
        <div className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
        </div>
        <div className="calendar-date">
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>

        {this.state.showDateTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>{weekdayshortname}</thead>
              <tbody>
                {daysinmonth}
                <tr>{trackingData.map((e) => e)}</tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
