import {FileUploadResponse} from "@amplicode/gql/graphql";

export interface NewFile {
  src: string
  title: string
  rawFile: File
}

export interface FileProvider {
  getPreSignedUrl: (meta: GetPreSignedUrlMeta) => Promise<FileUploadResponse>
  download: (meta: GetPreSignedUrlMeta | any | string, filename: string) => Promise<void>
  upload: (url: string, file: NewFile) => Promise<any>
}

export interface GetPreSignedUrlMeta {
  query: any,
  variables: any
}