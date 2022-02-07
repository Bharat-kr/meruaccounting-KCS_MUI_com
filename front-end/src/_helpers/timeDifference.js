export default function timeDiff(startTime, endTime) {
  let date_obj = new Date(new Number(startTime));
  const hrs = date_obj.getHours();
  const mins = date_obj.getMinutes();
  let date_obj_end = new Date(new Number(endTime));
  const hrs_end = date_obj_end.getHours();
  const mins_end = date_obj_end.getMinutes();
  let diff;
  if (hrs_end - hrs === 0) {
    diff = hrs_end - hrs + "h " + (-mins + mins_end) + "m";
  } else {
    diff = hrs_end - hrs + "h " + (60 - mins + mins_end) + "m";
  }

  return diff;
}
