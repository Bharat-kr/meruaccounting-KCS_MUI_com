export default function timeC(epoch_time) {
  let date_obj = new Date(new Number(epoch_time));
  const hrs = date_obj.getHours();
  const mins = date_obj.getMinutes();
  let hhmm =
    (hrs < 10 ? "0" + hrs : hrs) + ":" + (mins < 10 ? "0" + mins : mins);

  return hhmm;
}
