import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function timeC(epoch_time, timeZone) {
  let date_obj = new Date(Number(epoch_time));
  //error handling if no timezone is sent
  if (timeZone !== undefined && timeZone !== "") {
    date_obj = dayjs(date_obj).tz(timeZone);
  } else {
    date_obj = dayjs(date_obj);
  }

  const hrs = date_obj.hour();
  const mins = date_obj.minute();
  let hhmm =
    (hrs < 10 ? "0" + hrs : hrs) + ":" + (mins < 10 ? "0" + mins : mins);

  return hhmm;
}

export function timeCC(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes;
}
