import dayjs from "dayjs";

export function renderDateTime(dateTime: string) {
  return dateTime == null || dateTime === "" ? "" : dayjs(dateTime).format("MMMM D, YYYY h:mm A");
}
