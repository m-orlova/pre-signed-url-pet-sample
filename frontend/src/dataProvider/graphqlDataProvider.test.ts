import { expect } from "@jest/globals";
import { getListOperationName, getUpdateInputType } from "./graphqlDataProvider";

describe("graphqlDataProvider", () => {
  it("getListOperationName should return correct operation name for list query", async () => {
    const queryName = getListOperationName("PetDTO");
    expect(queryName).toEqual("petList");
  });

  it("getUpdateInputType", async () => {
    expect(getUpdateInputType("PetDTO")).toEqual("PetInputDTO");
    expect(getUpdateInputType("Owner")).toEqual("OwnerInput");
  });
});
