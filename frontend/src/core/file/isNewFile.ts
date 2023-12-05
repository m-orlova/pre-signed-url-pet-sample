export const isNewFile = (value: unknown) => {
  return value && value["rawFile"] !== undefined;
}