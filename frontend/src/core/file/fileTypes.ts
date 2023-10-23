import {FileUploadResponse} from "@amplicode/gql/graphql";

export interface NewFile {
  src: string
  title: string
  rawFile: File
}

export interface FileProvider {
  getPreSignedUploadUrl: (meta: GetPreSignedUrlMeta) => Promise<FileUploadResponse>
  download: (meta: GetPreSignedUrlMeta, filename: string) => Promise<void>
  upload: (url: string, file: NewFile) => Promise<any>
}

export interface GetPreSignedUrlMeta {
  query: any,
  variables: any
}