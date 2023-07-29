export function toTitleCase(str) {
  return str
    .split(" ")
    .map((i) => i[0].toUpperCase() + i.substring(1).toLowerCase())
    .join(" ");
}
