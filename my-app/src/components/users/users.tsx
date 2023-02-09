import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Tabs, Tab, TextField } from "@material-ui/core";
import TabPanel from "../../common/TabPanel";
import { a11yProps } from "../../common/utils/function";
import ListComponent from "../../common/ListComponent";
import { useEffect, useState } from "react";
import { columns } from "./tableinfo";
import { columnsAllUsers } from "./tableinfo";

interface IAccueil {
  userStore: UserStoreInterface;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

  useEffect(() => {
    userStore.getAllUser();
  }, [userStore]);

  const history = useNavigate();

  const [tabValue, setTabsValue] = useState(0);

  const handleOpenTabs = (event: any, value: any) => {
    setTabsValue(value);
  };

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  console.log("data professor :", userStore?.allProfessor);

  const handleSearchAllUser = () => {
    console.log("allUser function search");
  };

  const createNewUSer = () => {
    console.log("createnew user function");
  };

  const handleSearchAllProfessor = () => {
    console.log("allProfessor function search");
  };

  const handleSearchAllEtudiant = () => {
    console.log("allEtudiant function search");
  };

  const createNewEtudiant = () => {
    console.log("createnew etudiant function");
  };

  const handleSearchAllAdmin = () => {
    console.log("allAdmin function search");
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleOpenTabs}
          aria-label="basic tabs example"
        >
          <Tab label="Administrateurs" {...a11yProps(0)} />
          <Tab label="Professeurs" {...a11yProps(1)} />
          <Tab label="Etudiants" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {userStore?.allUser?.length > 0 ? (
          <ListComponent
            rows={userStore?.allUser}
            columns={columnsAllUsers}
            handleSearch={handleSearchAllUser}
            createNew={createNewUSer}
          />
        ) : (
          <div>Pas de résultat</div>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {userStore?.allProfessor?.length > 0 ? (
          <ListComponent rows={rows} columns={columns} />
        ) : (
          <div>Pas de résultat</div>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <ListComponent
          rows={rows}
          columns={columns}
          handleSearch={handleSearchAllEtudiant}
          createNew={createNewEtudiant}
        />
      </TabPanel>
    </Box>
  );
};

export default inject("userStore")(observer(Acceuil));
