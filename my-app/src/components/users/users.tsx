import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Tabs, Tab, TextField } from "@material-ui/core";
import TabPanel from "../../common/TabPanel";
import { a11yProps } from "../../common/utils/function";
import ListComponent from "../../common/ListComponent";
import { useEffect, useState } from "react";
import {
  columnsAllUsers,
  columnAdmin,
  columnProf,
  columnStudent,
} from "./tableinfo";
interface IAccueil {
  userStore: UserStoreInterface;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

  useEffect(() => {
    userStore.getAllUser();
  }, [userStore]);

  const history = useNavigate();

  const handleOpenTabs = (event: any, value: any) => {
    userStore.setTabsValue(value);
  };

  const handleSearch = (param: string) => () => {
    if (param === "admin") {
      console.log("admin");
    }

    if (param === "student") {
      console.log("etudiant");
    }

    if (param === "prof") {
      console.log("professor");
    }
  };

  const handleCreate = (param: string) => () => {
    if (param === "admin") {
      history("/users/createAdmin");
    }

    if (param === "student") {
      history("/users/createStudent");
    }

    if (param === "prof") {
      history("/users/createProf");
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={userStore?.tabsValue}
          onChange={handleOpenTabs}
          aria-label="basic tabs example"
        >
          <Tab label="Administrateurs" {...a11yProps(0)} />
          <Tab label="Professeurs" {...a11yProps(1)} />
          <Tab label="Etudiants" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={userStore?.tabsValue} index={0}>
        <ListComponent
          rows={userStore?.allAdmin}
          columns={columnAdmin}
          handleSearch={handleSearch("admin")}
          createNew={handleCreate("admin")}
        />
      </TabPanel>
      <TabPanel value={userStore?.tabsValue} index={1}>
        <ListComponent
          rows={userStore?.allProfessor}
          columns={columnProf}
          handleSearch={handleSearch("prof")}
          createNew={handleCreate("prof")}
        />
      </TabPanel>
      <TabPanel value={userStore?.tabsValue} index={2}>
        <ListComponent
          rows={userStore?.allEtudiant}
          columns={columnStudent}
          handleSearch={handleSearch("student")}
          createNew={handleCreate("student")}
        />
      </TabPanel>
    </Box>
  );
};

export default inject("userStore")(observer(Acceuil));
