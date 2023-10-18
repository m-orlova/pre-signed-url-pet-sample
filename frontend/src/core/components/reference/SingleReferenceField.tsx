import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";

export interface SingleReferenceFieldProps extends Omit<FunctionFieldProps, "render"> {
  recordRepresentation: (item: Record<string, unknown>) => string;
}

export const SingleReferenceField = (props: SingleReferenceFieldProps) => {
  const { source, recordRepresentation } = props;

  if (source == null) {
    return null;
  }
  return (
    <FunctionField render={(record: RaRecord) => recordRepresentation(record[source])} {...props} />
  );
};
