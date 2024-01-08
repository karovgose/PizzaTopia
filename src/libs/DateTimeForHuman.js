export default function DateTimeForHuman(str) {
  return str.replace('T', ' ').substring(0, 16);
}
