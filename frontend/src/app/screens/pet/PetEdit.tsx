import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback} from "react";
import {
  Edit,
  FileField,
  FileInput,
  FunctionField,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
  WithRecord
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {ExternalFileField} from "../../component/ExternalFileField";
import {fileProvider} from "../../../core/file/fileProvider";
import {isNewFile} from "../../../core/file/isNewFile";
import axios from "axios";

const PET = gql(`query Pet($id: ID!) {
  pet(id: $id) {
    id
    identifier
    name
    passport
  }
}`);
const UPDATE_PET = gql(`mutation UpdatePet($input: PetInput!) {
  updatePet(input: $input) {
    id
    identifier
    name
    passport
  }
}`);

const PET_PASSPORT_UPLOAD_URL = gql(`query PetPassportUploadUrl($contentType: String, $originalFilename: String!) {
 petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {
  objectKey
  uploadUrl
  }
}`);

const PET_PASSPORT_DOWNLOAD_URL = gql(`query PetPassportDownloadUrl($id: ID!) {
  petPassportDownloadUrl(id: $id) 
}`);

export const PetEdit = () => {
  const queryOptions = {
    meta: {
      query: PET,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const passport = data.passport;
        if (isNewFile(passport)) {
          //initialize data required to get a pre-signed URL for file upload
          const meta = {
            query: PET_PASSPORT_UPLOAD_URL,
            variables: {
              contentType: passport.rawFile.type,
              originalFilename: passport.title
            }
          };

          //get a pre-signed URL for file upload
          const fileUploadResponse = await fileProvider.getPreSignedUploadUrl(meta);
          const uploadUrl = fileUploadResponse.uploadUrl;

          //upload file using pre-signed URL
          await fileProvider.upload(uploadUrl, passport);

          //set file-related properties
          data.passport = fileUploadResponse.objectKey;
        }

        const params = {data, meta: {mutation: UPDATE_PET}};
        const options = {returnPromise: true};

        await update("Pet", params, options);

        notify("ra.notification.updated", {messageArgs: {smart_count: 1}});
        redirect("list", "Pet");
      } catch (response: any) {
        console.log("update failed with error", response);
        if (axios.isAxiosError(response) || response.message) {
          notify("file.uploadFail", {
            type: "error",
            messageArgs: {
              errorText: response.message
            }
          })
        } else {
          return checkServerValidationErrors(response, notify);
        }
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="identifier"/>
        <TextInput source="name"/>
        <WithRecord render={record =>
          <FileInput source="passport"
                     maxSize={50_000_000} //set max file size (in bytes), e.g. 5_000_000 equals to 5MB
                     accept="application/pdf" //set allowed content types, e.g. "application/pdf", "text/*", ["text/plain", "application/pdf"]
                     multiple={false}>
            <FunctionField render={fileRecord => isNewFile(fileRecord) ?
              <FileField source="src" title="title" download={fileRecord.title}/> :
              <ExternalFileField filename="passport.pdf" downloadFileMeta={{
                query: PET_PASSPORT_DOWNLOAD_URL,
                variables: {
                  id: record.id
                }
              }}/>}/>
          </FileInput>
        }/>
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["pet"], undefined>;
