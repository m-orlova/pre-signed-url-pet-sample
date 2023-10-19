/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation UpdatePet($input: PetInput!) {\n  updatePet(input: $input) {\n    id\n    identifier\n    name\n    passport\n  }\n}":
    types.UpdatePetDocument,
  "query PetPassportUploadUrl($contentType: String, $originalFilename: String!) {\n  petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}":
    types.PetPassportUploadUrlDocument,
  "query Pet($id: ID!) {\n  pet(id: $id) {\n    id\n    identifier\n    name\n    passport\n  }\n}":
    types.PetDocument,
  "query TemplateFileUploadUrl($contentType: String, $originalFilename: String!) {\n petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}":
    types.TemplateFileUploadUrlDocument,
  "query TemplateFileDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}":
    types.TemplateFileDownloadUrlDocument,
  "query PetList(\n  $sort: [PetOrderByInput]\n  $page: OffsetPageInput\n) {\n  petList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      identifier\n      name\n      passport\n    }\n    totalElements\n  }\n}":
    types.PetListDocument,
  "mutation DeletePet($id: ID!) {\n  deletePet(id: $id) \n}":
    types.DeletePetDocument,
  "query PetPassportDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}":
    types.PetPassportDownloadUrlDocument,
  "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n":
    types.UserInfoDocument,
  "\n query checkAuthenticated {\n   checkAuthenticated\n }\n":
    types.CheckAuthenticatedDocument,
  "\n  query userPermissions {\n   userPermissions\n  }\n":
    types.UserPermissionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePet($input: PetInput!) {\n  updatePet(input: $input) {\n    id\n    identifier\n    name\n    passport\n  }\n}"
): (typeof documents)["mutation UpdatePet($input: PetInput!) {\n  updatePet(input: $input) {\n    id\n    identifier\n    name\n    passport\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PetPassportUploadUrl($contentType: String, $originalFilename: String!) {\n  petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}"
): (typeof documents)["query PetPassportUploadUrl($contentType: String, $originalFilename: String!) {\n  petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Pet($id: ID!) {\n  pet(id: $id) {\n    id\n    identifier\n    name\n    passport\n  }\n}"
): (typeof documents)["query Pet($id: ID!) {\n  pet(id: $id) {\n    id\n    identifier\n    name\n    passport\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query TemplateFileUploadUrl($contentType: String, $originalFilename: String!) {\n petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}"
): (typeof documents)["query TemplateFileUploadUrl($contentType: String, $originalFilename: String!) {\n petPassportUploadUrl(contentType: $contentType, originalFilename: $originalFilename) {\n  objectKey\n  uploadUrl\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query TemplateFileDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}"
): (typeof documents)["query TemplateFileDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PetList(\n  $sort: [PetOrderByInput]\n  $page: OffsetPageInput\n) {\n  petList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      identifier\n      name\n      passport\n    }\n    totalElements\n  }\n}"
): (typeof documents)["query PetList(\n  $sort: [PetOrderByInput]\n  $page: OffsetPageInput\n) {\n  petList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      identifier\n      name\n      passport\n    }\n    totalElements\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePet($id: ID!) {\n  deletePet(id: $id) \n}"
): (typeof documents)["mutation DeletePet($id: ID!) {\n  deletePet(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PetPassportDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}"
): (typeof documents)["query PetPassportDownloadUrl($id: ID!) {\n  petPassportDownloadUrl(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n"
): (typeof documents)["\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n query checkAuthenticated {\n   checkAuthenticated\n }\n"
): (typeof documents)["\n query checkAuthenticated {\n   checkAuthenticated\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userPermissions {\n   userPermissions\n  }\n"
): (typeof documents)["\n  query userPermissions {\n   userPermissions\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
