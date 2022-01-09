export function settingsValueToString(value) {
  if (typeof value === "boolean" && value) {
    return "True";
  } else if (typeof value === "boolean" && !value) {
    return "False";
  }
  return value;
}
