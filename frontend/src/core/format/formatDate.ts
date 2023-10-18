import dayjs from "dayjs";

/**
 * The format prop accepts a callback taking the value from the form state,
 * and returning the input value (which should be a string).
 * https://marmelab.com/react-admin/Inputs.html#format
 */
export function formatDate(value: string | null): string {
  return value == null || value === "" ? "" : dayjs(+value).format("YYYY-MM-DD");
}
