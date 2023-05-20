import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import config from "../../config";
import person from "../../assets/person_icon.png";

export const columnsAllUsers = [
  {
    id: 0,
    field: "mail",
    headerName: "E-mail",
    width: 150,
  },
  {
    id: 1,
    field: "role",
    headerName: "Rôle",
    width: 150,
  },
  {
    id: 2,
    field: "nom",
    headerName: "Nom",
    width: 150,
  },
  {
    id: 3,
    field: "prenom",
    headerName: "Prénom",
    width: 150,
  },
  {
    id: 4,
    field: "sexe",
    headerName: "Sexe",
    width: 150,
  },
];

export const columnAdmin = [
  {
    id: 0,
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params: any) => (
      <img
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: "0 auto",
          border: "solid 2px #f50057",
        }}
        src={params.value ? `${config.baseGetFile}${params.value}` : person}
        alt="profile_image"
      />
    ),
  },
  {
    id: 1,
    field: "nomAdmin",
    headerName: "Nom",
    width: 150,
  },
  {
    id: 2,
    field: "prenomAdmin",
    headerName: "Prénom",
    width: 150,
  },
  {
    id: 3,
    field: "adresseAdmin",
    headerName: "Adresse",
    width: 150,
  },
  {
    id: 4,
    field: "mail",
    headerName: "E-mail",
    width: 150,
  },
  {
    id: 5,
    field: "CIN",
    headerName: "CIN",
    width: 150,
  },
  {
    id: 6,
    field: "birthday",
    headerName: "Date de naissance",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY")}`,
  },
  {
    id: 7,
    field: "placeOfBirth",
    headerName: "Lieu de naissance",
    width: 150,
  },
  {
    id: 8,
    field: "sexe",
    headerName: "Sexe",
    width: 150,
  },
  {
    id: 9,
    field: "poste",
    headerName: "Poste",
    width: 150,
  },
];

export const columnProf = [
  {
    id: 0,
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params: any) => (
      <img
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: "0 auto",
          border: "solid 2px yellow",
        }}
        src={params.value ? `${config.baseGetFile}${params.value}` : person}
        alt="profile_image"
      />
    ),
  },
  {
    id: 1,
    field: "nomProf",
    headerName: "Nom",
    width: 150,
  },
  {
    id: 2,
    field: "prenomProf",
    headerName: "Prénom",
    width: 150,
  },
  {
    id: 3,
    field: "adresseProf",
    headerName: "Adresse",
    width: 150,
  },
  {
    id: 4,
    field: "mail",
    headerName: "E-mail",
    width: 150,
  },
  {
    id: 5,
    field: "CIN",
    headerName: "CIN",
    width: 150,
  },
  {
    id: 6,
    field: "birthday",
    headerName: "Date de naissance",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY")}`,
  },
  {
    id: 7,
    field: "placeOfBirth",
    headerName: "Lieu de naissance",
    width: 150,
  },
  {
    id: 8,
    field: "sexe",
    headerName: "Sexe",
    width: 150,
  },
  {
    id: 9,
    field: "matiere",
    headerName: "Matiere",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.matiere.map((k: any) => `${k.niveau} ${k.matiere}`),
  },
];

export const columnStudent = [
  {
    id: 0,
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params: any) => (
      <img
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: "0 auto",
          border: "solid 2px yellow",
        }}
        src={params.value ? `${config.baseGetFile}${params.value}` : person}
        alt="profile_image"
      />
    ),
  },
  {
    id: 1,
    field: "nomEtu",
    headerName: "Nom",
    width: 150,
  },
  {
    id: 2,
    field: "prenomEtu",
    headerName: "Prénom",
    width: 150,
  },
  {
    id: 3,
    field: "adresseEtu",
    headerName: "Adresse",
    width: 150,
  },
  {
    id: 4,
    field: "mail",
    headerName: "E-mail",
    width: 150,
  },
  {
    id: 5,
    field: "CIN",
    headerName: "CIN",
    width: 150,
  },
  {
    id: 6,
    field: "birthday",
    headerName: "Date de naissance",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY")}`,
  },
  {
    id: 7,
    field: "placeOfBirth",
    headerName: "Lieu de naissance",
    width: 150,
  },
  {
    id: 8,
    field: "sexe",
    headerName: "Sexe",
    width: 150,
  },
  {
    id: 9,
    field: "nomLycee",
    headerName: "Lycée",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.lycee.nomLycee}`,
  },
  {
    id: 10,
    field: "TechG",
    headerName: "Options",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => `${params.row.lycee.TechG}`,
  },
  {
    id: 11,
    field: "serieBacc",
    headerName: "Série",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.lycee.serieBacc}`,
  },
];
