import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Tabs, Tab, TextField } from "@material-ui/core";
import TabPanel from "../../common/TabPanel";
import { a11yProps } from "../../common/utils/function";
import ListComponent from "../../common/ListComponent";
import {
  adminDefault,
  defaultProf,
  defaultStudent,
} from "../../common/default";
import { useEffect, useState } from "react";
import { columnAdmin, columnProf, columnStudent } from "./tableinfo";
import { IAdmin, IEtudiant, IProfessor } from "../../common/Interfaces";
import EditDialogAdmin from "./createView/EditDialog";
import EditDialogProf from "./createViewProfessor/EditDialog";
import EditDialogStudent from "./createStudent/EditDialog";
interface IAccueil {
  userStore: UserStoreInterface;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

  useEffect(() => {
    userStore.getAllUser();
  }, [userStore]);

  const history = useNavigate();

  const [dataAdmin, setDataAdmin] = useState(adminDefault);
  const [openAdmin, setOpenAdmin] = useState(false);
  const handleCloseAdmin = () => {
    setOpenAdmin(false);
  };

  const [dataProf, setDataProf] = useState(defaultProf);
  const [openProf, setOpenProf] = useState(false);
  const handleCloseProf: any = () => {
    setOpenProf(false);
  };

  const [dataStudent, setDataStudent] = useState(defaultStudent);
  const [openStudent, setOpenStudent] = useState(false);
  const handleCloseStudent: any = () => {
    setOpenStudent(false);
  };

  const [searchAdmin, setSearchAdmin] = useState("");

  const handleSearchAdmin = (e: any) => {
    const { value } = e.target;
    setSearchAdmin(value);
  };

  const [searchProf, setSearchProf] = useState("");

  const handleSearchProf = (e: any) => {
    const { value } = e.target;
    setSearchProf(value);
  };

  const [searchStudent, setSearchStudent] = useState("");

  const handleSearchStudent = (e: any) => {
    const { value } = e.target;
    setSearchStudent(value);
  };

  const handleOpenTabs = (event: any, value: any) => {
    userStore.setTabsValue(value);
  };

  const handleSearch = (param: string) => () => {
    if (param === "admin") {
      userStore.searchAdmin(searchAdmin);
    }

    if (param === "student") {
      userStore.searchStudent(searchStudent);
    }

    if (param === "prof") {
      userStore.searchProf(searchProf);
    }
  };

  const handleCreate = (data: string) => () => {
    history(`/users/${data}`);
  };

  const onRowSelectedAdmin = (data: IAdmin) => {
    setOpenAdmin(true);
    setDataAdmin(data);
  };

  const onRowSelectedProf = (data: IProfessor) => {
    setOpenProf(true);
    setDataProf(data);
  };

  const onRowSelectedStudent = (data: IEtudiant) => {
    setOpenStudent(true);
    setDataStudent(data);
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
          <Tab label="Enseignants" {...a11yProps(1)} />
          <Tab label="Etudiants" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={userStore?.tabsValue} index={0}>
        <ListComponent
          rows={userStore?.allAdmin}
          columns={columnAdmin}
          handleSearch={handleSearch("admin")}
          createNew={handleCreate("createAdmin")}
          onRowClick={onRowSelectedAdmin}
          search={searchAdmin}
          setSearch={handleSearchAdmin}
        />

        <EditDialogAdmin
          openDialogAdmin={openAdmin}
          handleCloseDialogAdmin={handleCloseAdmin}
          data={dataAdmin}
        />
      </TabPanel>
      <TabPanel value={userStore?.tabsValue} index={1}>
        <ListComponent
          rows={userStore?.allProfessor}
          columns={columnProf}
          handleSearch={handleSearch("prof")}
          createNew={handleCreate("createProf")}
          onRowClick={onRowSelectedProf}
          search={searchProf}
          setSearch={handleSearchProf}
        />

        <EditDialogProf
          openDialogAdmin={openProf}
          handleCloseDialogAdmin={handleCloseProf}
          data={dataProf}
        />
      </TabPanel>
      <TabPanel value={userStore?.tabsValue} index={2}>
        <ListComponent
          rows={userStore?.allEtudiant}
          columns={columnStudent}
          handleSearch={handleSearch("student")}
          createNew={handleCreate("createStudent")}
          onRowClick={onRowSelectedStudent}
          search={searchStudent}
          setSearch={handleSearchStudent}
        />

        <EditDialogStudent
          openDialogAdmin={openStudent}
          handleCloseDialogAdmin={handleCloseStudent}
          data={dataStudent}
        />
      </TabPanel>
    </Box>
  );
};

export default inject("userStore")(observer(Acceuil));
