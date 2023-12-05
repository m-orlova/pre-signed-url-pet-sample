export interface NewFile {
  src: string
  title: string
  rawFile: File
}

export interface FileProvider {
  download: (url: string, filename: string) => Promise<void>
  upload: (url: string, file: File) => Promise<any>
}

export interface GetPreSignedUrlMeta {
  query: any,
  variables: any
}