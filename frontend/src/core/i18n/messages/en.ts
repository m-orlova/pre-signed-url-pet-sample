import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  resources: {
    Pet: {
      name: "Pet |||| Pets",

      fields: {
        identifier: "Identifier",
        name: "Name",
        passport: "Passport"
      }
    }
  },

  amplicode: {
    not_set: "Not set"
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
