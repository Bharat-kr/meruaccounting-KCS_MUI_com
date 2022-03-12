export default function Capitalize(string) {
  console.log(string.name);
  return string.toString().charAt(0).toUpperCase() + string.slice(1);
}
