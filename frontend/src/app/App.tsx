import {DevSupport} from "@react-buddy/ide-toolbox";
import {AdminContext, AdminUI, Loading, Resource} from "react-admin";
import {useAuthProvider} from "../authProvider/useAuthProvider";
import {getPetRecordRepresentation} from "../core/record-representation/getPetRecordRepresentation";
import {dataProvider} from "../dataProvider/graphqlDataProvider";
import {ComponentPreviews, useInitial} from "../dev";
import {i18nProvider} from "../i18nProvider";
import {AdminLayout} from "./AdminLayout";
import {PetCreate} from "./screens/pet/PetCreate";
import {PetEdit} from "./screens/pet/PetEdit";
import {PetList} from "./screens/pet/PetList";
import {PetShow} from "./screens/pet/PetShow";

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout} requireAuth={true}>
          <Resource
            name="Pet"
            list={PetList}
            recordRepresentation={getPetRecordRepresentation}
            create={PetCreate}
            edit={PetEdit}
            show={PetShow}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
