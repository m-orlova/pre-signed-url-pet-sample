import { LocalizationProvider, TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FieldTitle, InputHelperText, InputProps, useInput, useLocaleState } from "react-admin";
import { LOCAL_TIME_FORMAT } from "../../../dataProvider/graphqlDataProvider";
import { PickersActionBar } from "./PickersActionBar";

export interface LocalTimeInputProps
  extends Omit<InputProps, "onChange" | "format" | "defaultValue">,
    Omit<TimePickerProps<Dayjs>, "label"> {}

/**
 * Input for working with LocalTime graphQL scalar in react-admin.
 */
export const LocalTimeInput = ({ format, ...props }: LocalTimeInputProps) => {
  const { field, fieldState, id, isRequired, formState } = useInput({
    parse: (value) => value?.format(LOCAL_TIME_FORMAT),
    ...props,
    format: (value) => (value ? dayjs(value, LOCAL_TIME_FORMAT) : null),
  });
  const [locale] = useLocaleState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <TimePicker
        {...field}
        inputRef={field.ref}
        label={<FieldTitle label={props.label} source={props.source} isRequired={isRequired} />}
        slots={{
          actionBar: PickersActionBar,
        }}
        slotProps={{
          textField: {
            id,
            error: fieldState.error != null,
            helperText: (
              <InputHelperText
                touched={fieldState.isTouched || formState.isSubmitted}
                error={fieldState.error?.message}
                helperText={props.helperText}
              />
            ),
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};
