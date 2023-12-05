import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import React, {useCallback} from "react";
import {
  Create,
  FileField,
  FileInput,
  FunctionField,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {isNewFile} from "../../../core/file/isNewFile";
import axios from "axios";
import {apolloClient} from "../../../core/apollo/client";
import {NewFile} from "../../../core/file/fileTypes";
import {fileProvider} from "../../../core/file/fileProvider";
import {TypedQueryDocumentNode} from "graphql/utilities";

const UPDATE_PET = gql(`mutation UpdatePet($input: PetInput!) {
  updatePet(input: $input) {
    id
    identifier
    name
    passport
    passportFilename
  }
}`);

const PET_PASSPORT_UPLOAD_URL = gql(`query PetPassportUploadUrl($originalFilename: String!) {
  petPassportUploadUrl(originalFilename: $originalFilename) {
  fileId
  uploadUrl
  }
}`);

export const PetCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const passport = data.passport;
        if (isNewFile(passport)) {
          const {rawFile} = passport as NewFile;

          //get a pre-signed URL and generated file id
          const {fileId, uploadUrl} = await apolloClient.query({
            query: PET_PASSPORT_UPLOAD_URL as TypedQueryDocumentNode,
            variables: {
              // originalFilename: null //TODO: initialize value
              originalFilename: rawFile.name
            }
          }).then(value => {
            return value.data.petPassportUploadUrl;
          });

          //upload a file
          await fileProvider.upload(uploadUrl, rawFile);

          data.passport = fileId;

          //TODO: set file-related fields like original filename, contentType
          data.passportFilename = rawFile.name;
        }

        const params = {data, meta: {mutation: UPDATE_PET}};
        const options = {returnPromise: true};

        await create("Pet", params, options);

        notify("ra.notification.created", {messageArgs: {smart_count: 1}});
        redirect("list", "Pet");
      } catch (response: any) {
        console.log("create failed with error", response);
        if (axios.isAxiosError(response) || response.message) {
          notify("file.uploadFail", {
            type: "error",
            messageArgs: {
              errorText: response.message
            }
          });
        } else {
          return checkServerValidationErrors(response, notify);
        }
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list">
      <SimpleForm onSubmit={save}>
        <TextInput source="identifier"/>
        <TextInput source="name"/>
        <FileInput source="passport"
                   maxSize={50_000_000} //set max file size (in bytes), e.g. 5_000_000 equals to 5MB
                   accept="application/pdf" //set allowed content types, e.g. "application/pdf", "text/*", ["text/plain", "application/pdf"]
                   multiple={false}>
          <FunctionField render={record => <FileField source="src" title="title" download={record.title}/>}/>
        </FileInput>
        {/* <TextInput source="passportFilename"/>*/}
      </SimpleForm>
    </Create>
  );
};

const PET_TYPE = gql(`query Pet($id: ID!) {
  pet(id: $id) {
    id
    identifier
    name
    passport
    passportFilename
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["pet"], undefined>;
