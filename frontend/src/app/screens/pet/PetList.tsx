import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {Datagrid, DeleteButton, EditButton, FunctionField, List, TextField} from "react-admin";
import {ExternalFileField} from "../../component/ExternalFileField";

const PET_LIST = gql(`query PetList(
  $sort: [PetOrderByInput]
  $page: OffsetPageInput
) {
  petList(
    sort: $sort
    page: $page
  ) {
    content {
      id
      identifier
      name
      passport
    }
    totalElements
  }
}`);

const DELETE_PET = gql(`mutation DeletePet($id: ID!) {
  deletePet(id: $id) 
}`);

const PET_PASSPORT_DOWNLOAD_URL = gql(`query PetPassportDownloadUrl($id: ID!) {
  petPassportDownloadUrl(id: $id) 
}`);


export const PetList = () => {
  const queryOptions = {
    meta: {
      query: PET_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="identifier"/>
        <TextField source="name"/>
        <FunctionField source="passport"
                       sortable={false}
                       render={record => record.passport ?
                         <ExternalFileField label="file.download" //set label for link button, can be omitted
                                            filename="passport.pdf" //set downloaded file name
                                            downloadFileMeta={{
                                              query: PET_PASSPORT_DOWNLOAD_URL,
                                              variables: {id: record.id}
                                            }}/> : null}/>
        <EditButton/>
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{meta: {mutation: DELETE_PET}}}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
