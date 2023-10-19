import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {FunctionField, Show, SimpleShowLayout, TextField} from "react-admin";
import {ExternalFileField} from "../../component/ExternalFileField";

const PET = gql(`query Pet($id: ID!) {
  pet(id: $id) {
    id
    identifier
    name
    passport
  }
}`);

const PET_PASSPORT_DOWNLOAD_URL = gql(`query PetPassportDownloadUrl($id: ID!) {
  petPassportDownloadUrl(id: $id) 
}`);

export const PetShow = () => {
  const queryOptions = {
    meta: {
      query: PET,
      resultDataPath: null,
    },
  };

  return (
    <Show<ItemType> queryOptions={queryOptions}>
      <SimpleShowLayout>
        <TextField source="identifier"/>
        <TextField source="name"/>
        <FunctionField source="passport"
                       sortable={false}
                       render={record => record.passport ? <ExternalFileField filename="passport.pdf"
                                                                              downloadFileMeta={{
                                                                                query: PET_PASSPORT_DOWNLOAD_URL,
                                                                                variables: {id: record.id}
                                                                              }}/> : null}/>
      </SimpleShowLayout>
    </Show>
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
