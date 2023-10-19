/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type FileUploadResponse = {
  __typename?: "FileUploadResponse";
  objectKey: Scalars["String"];
  uploadUrl: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  deletePet?: Maybe<Scalars["Void"]>;
  updatePet: Pet;
};

export type MutationDeletePetArgs = {
  id: Scalars["ID"];
};

export type MutationUpdatePetArgs = {
  input: PetInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Pet = {
  __typename?: "Pet";
  id?: Maybe<Scalars["ID"]>;
  identifier?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  passport?: Maybe<Scalars["String"]>;
};

export type PetInput = {
  id?: InputMaybe<Scalars["ID"]>;
  identifier?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  passport?: InputMaybe<Scalars["String"]>;
};

export type PetOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<PetOrderByProperty>;
};

export enum PetOrderByProperty {
  Identifier = "IDENTIFIER",
  Name = "NAME",
}

export type PetResultPage = {
  __typename?: "PetResultPage";
  content?: Maybe<Array<Maybe<Pet>>>;
  totalElements: Scalars["Long"];
};

export type Query = {
  __typename?: "Query";
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  pet: Pet;
  petList: PetResultPage;
  petPassportDownloadUrl: Scalars["String"];
  petPassportUploadUrl: FileUploadResponse;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryPetArgs = {
  id: Scalars["ID"];
};

export type QueryPetListArgs = {
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<PetOrderByInput>>>;
};

export type QueryPetPassportDownloadUrlArgs = {
  id: Scalars["ID"];
};

export type QueryPetPassportUploadUrlArgs = {
  contentType?: InputMaybe<Scalars["String"]>;
  originalFilename: Scalars["String"];
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdatePetMutationVariables = Exact<{
  input: PetInput;
}>;

export type UpdatePetMutation = {
  __typename?: "Mutation";
  updatePet: {
    __typename?: "Pet";
    id?: string | null;
    identifier?: string | null;
    name?: string | null;
    passport?: string | null;
  };
};

export type PetPassportUploadUrlQueryVariables = Exact<{
  contentType?: InputMaybe<Scalars["String"]>;
  originalFilename: Scalars["String"];
}>;

export type PetPassportUploadUrlQuery = {
  __typename?: "Query";
  petPassportUploadUrl: {
    __typename?: "FileUploadResponse";
    objectKey: string;
    uploadUrl: string;
  };
};

export type PetQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PetQuery = {
  __typename?: "Query";
  pet: {
    __typename?: "Pet";
    id?: string | null;
    identifier?: string | null;
    name?: string | null;
    passport?: string | null;
  };
};

export type TemplateFileUploadUrlQueryVariables = Exact<{
  contentType?: InputMaybe<Scalars["String"]>;
  originalFilename: Scalars["String"];
}>;

export type TemplateFileUploadUrlQuery = {
  __typename?: "Query";
  petPassportUploadUrl: {
    __typename?: "FileUploadResponse";
    objectKey: string;
    uploadUrl: string;
  };
};

export type TemplateFileDownloadUrlQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TemplateFileDownloadUrlQuery = {
  __typename?: "Query";
  petPassportDownloadUrl: string;
};

export type PetListQueryVariables = Exact<{
  sort?: InputMaybe<
    Array<InputMaybe<PetOrderByInput>> | InputMaybe<PetOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type PetListQuery = {
  __typename?: "Query";
  petList: {
    __typename?: "PetResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Pet";
      id?: string | null;
      identifier?: string | null;
      name?: string | null;
      passport?: string | null;
    } | null> | null;
  };
};

export type DeletePetMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePetMutation = {
  __typename?: "Mutation";
  deletePet?: any | null;
};

export type PetPassportDownloadUrlQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PetPassportDownloadUrlQuery = {
  __typename?: "Query";
  petPassportDownloadUrl: string;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: "Query";
  userInfo?: {
    __typename?: "UserInfo";
    id: string;
    fullName?: string | null;
    avatar?: string | null;
  } | null;
};

export type CheckAuthenticatedQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAuthenticatedQuery = {
  __typename?: "Query";
  checkAuthenticated?: any | null;
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

export const UpdatePetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PetInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "identifier" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "passport" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePetMutation, UpdatePetMutationVariables>;
export const PetPassportUploadUrlDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PetPassportUploadUrl" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "contentType" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "originalFilename" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petPassportUploadUrl" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "contentType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "contentType" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "originalFilename" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "originalFilename" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "objectKey" } },
                { kind: "Field", name: { kind: "Name", value: "uploadUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PetPassportUploadUrlQuery,
  PetPassportUploadUrlQueryVariables
>;
export const PetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Pet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "identifier" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "passport" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PetQuery, PetQueryVariables>;
export const TemplateFileUploadUrlDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TemplateFileUploadUrl" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "contentType" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "originalFilename" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petPassportUploadUrl" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "contentType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "contentType" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "originalFilename" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "originalFilename" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "objectKey" } },
                { kind: "Field", name: { kind: "Name", value: "uploadUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TemplateFileUploadUrlQuery,
  TemplateFileUploadUrlQueryVariables
>;
export const TemplateFileDownloadUrlDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TemplateFileDownloadUrl" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petPassportDownloadUrl" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TemplateFileDownloadUrlQuery,
  TemplateFileDownloadUrlQueryVariables
>;
export const PetListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PetList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PetOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "identifier" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "passport" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PetListQuery, PetListQueryVariables>;
export const DeletePetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePetMutation, DeletePetMutationVariables>;
export const PetPassportDownloadUrlDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PetPassportDownloadUrl" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petPassportDownloadUrl" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PetPassportDownloadUrlQuery,
  PetPassportDownloadUrlQueryVariables
>;
export const UserInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const CheckAuthenticatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkAuthenticated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkAuthenticated" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables
>;
export const UserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userPermissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userPermissions" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserPermissionsQuery,
  UserPermissionsQueryVariables
>;
