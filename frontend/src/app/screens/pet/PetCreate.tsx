import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_PET = gql(`mutation UpdatePet($input: PetInput!) {
  updatePet(input: $input) {
    id
    identifier
    name
    passport
  }
}`);

export const PetCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PET } };
        const options = { returnPromise: true };

        await create("Pet", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "Pet");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list">
      <SimpleForm onSubmit={save}>
        <TextInput source="identifier" />
        <TextInput source="name" />
        <TextInput source="passport" />
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
