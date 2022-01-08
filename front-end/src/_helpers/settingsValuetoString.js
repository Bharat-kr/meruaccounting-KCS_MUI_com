export function settingsValueToString(value) {
  if (typeof value === "string") {
    return value;
  } else if (value) {
    return "True";
  } else if (!value) {
    return "False";
  }
}
