import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/**
 * The format prop accepts a callback taking the value from the form state,
 * and returning the input value (which should be a string).
 * https://marmelab.com/react-admin/Inputs.html#format
 */
export function formatOffsetTime(value: string | null): string {
  return value == null || value === "" ? "" : dayjs(value, "HH:mm:ss+HH:mm").format("HH:mm");
}
