import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useNotify, useRedirect, useUpdate } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

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
        const params = { data, meta: { mutation: UPDATE_PET } };
        const options = { returnPromise: true };

        await update("Pet", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "Pet");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="identifier" />
        <TextInput source="name" />
        <TextInput source="passport" />
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
