export default function secondsToHms(d, ttt = "hrm") {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  if (ttt == "h:mm") {
    var hDisplay = h > 0 ? h : "0";
    var mDisplay = m > 0 ? (m < 10 ? "0" + m : m) : "00";
    var sDisplay = "";
    return hDisplay + ":" + mDisplay + sDisplay;
  } else {
    var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "0 hr ";
    var mDisplay = m > 0 ? m + (m == 1 ? " m" : " m") : " 00 m";
    var sDisplay = "";
    return hDisplay + mDisplay + sDisplay;
  }
}
