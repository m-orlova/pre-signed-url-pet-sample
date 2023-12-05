import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {alpha} from "@mui/system";
import linkClasses from "@mui/material/Link/linkClasses";
import {useCallback} from "react";
import {ButtonProps, useNotify, useRecordContext, useTranslate} from "react-admin";
import get from 'lodash/get';
import {fileProvider} from "../../core/file/fileProvider";
import {GetPreSignedUrlMeta} from "../../core/file/fileTypes";
import {apolloClient} from "../../core/apollo/client";

interface ExternalFileFieldProps {
  filename: string
  preSignedUrlQueryOptions: GetPreSignedUrlMeta
}

export const ExternalFileField = (props: ExternalFileFieldProps & ButtonProps) => {
  const {preSignedUrlQueryOptions, filename, label, ...rest} = props;
  const notify = useNotify();
  const record = useRecordContext(props);
  const filenameValue = get(record, filename) || filename;
  const translate = useTranslate();
  const labelValue = label ? translate(label) : null;

  const handleDownload = useCallback(async (event: any) => {
    event.stopPropagation();

    const downloadUrl = await getPreSignedUrlInternal(preSignedUrlQueryOptions);
    if (downloadUrl) {
      fileProvider.download(downloadUrl, filenameValue)
        .catch(error => {
          console.log("File download error: ", error);
          notify("file.downloadFail", {
            type: "error", messageArgs: {
              filename: filenameValue
            }
          });
        });
    } else {
      notify("file.downloadFail")
    }
  }, [notify, preSignedUrlQueryOptions, filenameValue]);

  return (
    <>
      <FileLinkButton
        disableRipple={true}
        onClick={handleDownload} {...rest}>
        {labelValue ? labelValue : filenameValue}
      </FileLinkButton>
    </>
  );
};

//style is taken from Link with component='button' (MUI)
export const FileLinkButton = styled(Button, {
  name: "FileLinkButton",
  overridesResolver: (_props, styles) => styles.root,
})(({theme}) => ({
  textTransform: "none",
  textDecoration: "underline",
  textDecorationColor: alpha(theme.palette.primary.main, 0.4),
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  "&::-moz-focus-inner": {
    borderStyle: "none" // Remove Firefox dotted outline.
  },

  minWidth: "auto",
  [`&.${linkClasses.focusVisible}`]: {
    outline: "auto"
  },
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
    textDecorationColor: "inherit"
  },
}));

const getSelectionSetName = (query: Record<string, any>): string => {
  return query.definitions[0].selectionSet.selections[0].name.value;
};

const getPreSignedUrlInternal = async (meta) => {
  const {query, variables} = meta;
  const selectionSetName = getSelectionSetName(query);

  return await apolloClient.query({query, variables})
    .then(value => {
      console.log("Get pre-signed URL answer: ", value);
      return value.data[selectionSetName];
    }).catch(err => {
      console.log("Unable to get pre-signed URL: ", err);
      return undefined;
    });
}