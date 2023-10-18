import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Show, SimpleShowLayout, TextField } from "react-admin";

const PET = gql(`query Pet($id: ID!) {
  pet(id: $id) {
    id
    identifier
    name
    passport
  }
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
        <TextField source="id" />

        <TextField source="identifier" />
        <TextField source="name" />
        <TextField source="passport" />
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
