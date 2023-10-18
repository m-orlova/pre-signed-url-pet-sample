import dayjs from "dayjs";

/**
 * The format prop accepts a callback taking the value from the form state,
 * and returning the input value (which should be a string).
 * https://marmelab.com/react-admin/Inputs.html#format
 */
export function formatTimestamp(timestamp: string | null): string {
  return timestamp == null || timestamp === ""
    ? ""
    : dayjs.unix(Number(timestamp) / 1000).format("YYYY-MM-DDTHH:mm");
}
