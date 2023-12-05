import {FileProvider} from "./fileTypes";
import axios from "axios";

export const fileProvider: FileProvider = {
  download: async (url, filename) => {
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
    return await axios.put(url, file, {
      headers: {
        "Content-Type": file.type
      }
    }).catch(err => {
      console.log("Error while file uploading: ", err);
      throw err;
    });
  }
}