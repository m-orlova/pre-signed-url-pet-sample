export const isNewFile = (value: any) => {
  return value && value["rawFile"] !== undefined;
}