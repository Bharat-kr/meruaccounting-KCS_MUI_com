export function getFullName(firstName, lastName) {
  let name = '';
  if (firstName && lastName) {
    name = firstName + ' ' + lastName;
  } else if (!firstName) {
    name = lastName;
  } else if (!lastName) {
    name = firstName;
  }
  return name;
}
