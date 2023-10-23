import {FileProvider} from "./fileTypes";
import {apolloClient} from "../apollo/client";
import axios from "axios";

export const fileProvider: FileProvider = {
  getPreSignedUploadUrl: async (meta) => {
    if (!meta.query) {
      throw new Error("Unable to get pre-signed URL");
    }
    return getPreSignedUrlInternal(meta);
  },
  download: async (meta, filename) => {
    let url;
    if (meta.query !== null) {
      url = await getPreSignedUrlInternal(meta) as string;
    }
    if (!url) {
      throw new Error("Unable to get file download URL");
    }
    return axios.get(url, {
      responseType: "blob"
    }).then(response => {
      return response.data.slice();
    })
      .then(blob => {
        if (blob) {
          const anchor: HTMLAnchorElement = document.createElement("a");
          anchor.href = window.URL.createObjectURL(blob);
          anchor.download = filename;
          anchor.click();
        } else {
          throw new Error("File content is undefined");
        }
      });
  },
  upload: async (url, file) => {
    if (url) {
      return await axios.put(url, file.rawFile, {
        headers: {
          "Content-Type": file.rawFile.type
        }
      }).catch(err => {
        console.log("Error while file uploading: ", err);
        throw err;
      });
    }
  }
}

const getSelectionSetName = (query: Record<string, any>): string => {
  return query.definitions[0].selectionSet.selections[0].name.value;
};

const getPreSignedUrlInternal = async (meta) => {
  const {query, variables} = meta;
  const selectionSetName = getSelectionSetName(query);

  return await apolloClient.query({query, variables})
    .then(value => {
      console.log("Get pre-signed URL answer: ", value);
      return value.data[selectionSetName];
    }).catch(err => {
      console.log("Unable to get pre-signed URL: ", err);
      return undefined;
    });
}