import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from 'moment'

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
  ]

  export const columnAdmin = [
    {
      id: 0,
      field: "nomAdmin",
      headerName: "Nom",
      width: 150,
    },
    {
      id: 1,
      field: "prenomAdmin",
      headerName: "Prénom",
      width: 150,
    },
    {
      id: 2,
      field: "adresseAdmin",
      headerName: "Adresse",
      width: 150,
    },
    {
      id: 3,
      field: "CIN",
      headerName: "CIN",
      width: 150,
    },
    {
      id: 4,
      field: "birthday",
      headerName: "Date de naissance",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY") }`,
    },
    {
      id: 5,
      field: "placeOfBirth",
      headerName: "Lieu de naissance",
      width: 150,
    },
    {
      id: 6,
      field: "sexe",
      headerName: "Sexe",
      width: 150,
    },
    {
      id: 7,
      field: "poste",
      headerName: "Poste",
      width: 150,
    },
  ]

  export const columnProf = [
    {
      id: 0,
      field: "nomProf",
      headerName: "Nom",
      width: 150,
    },
    {
      id: 1,
      field: "prenomProf",
      headerName: "Prénom",
      width: 150,
    },
    {
      id: 1,
      field: "adresseProf",
      headerName: "Adresse",
      width: 150,
    },
    {
      id: 1,
      field: "CIN",
      headerName: "CIN",
      width: 150,
    },
    {
      id: 1,
      field: "birthday",
      headerName: "Date de naissance",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY") }`,
    },
    {
      id: 1,
      field: "placeOfBirth",
      headerName: "Lieu de naissance",
      width: 150,
    },
    {
      id: 1,
      field: "sexe",
      headerName: "Sexe",
      width: 150,
    },
    {
      id: 1,
      field: "matiere",
      headerName: "Matiere",
      width: 150,
    },
  ]

  export const columnStudent = [
    {
      id: 0,
      field: "nomEtu",
      headerName: "Nom",
      width: 150,
    },
    {
      id: 1,
      field: "prenomEtu",
      headerName: "Prénom",
      width: 150,
    },
    {
      id: 2,
      field: "adresseEtu",
      headerName: "Adresse",
      width: 150,
    },
    {
      id: 3,
      field: "CIN",
      headerName: "CIN",
      width: 150,
    },
    {
      id: 4,
      field: "birthday",
      headerName: "Date de naissance",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.birthday).format("DD/MM/YYYY") }`,
    },
    {
      id: 5,
      field: "placeOfBirth",
      headerName: "Lieu de naissance",
      width: 150,
    },
    {
      id: 6,
      field: "sexe",
      headerName: "Sexe",
      width: 150,
    },
    {
      id: 7,
      field: "nomLycee",
      headerName: "Lycée",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.lycee.nomLycee }`,
    },
    {
      id: 8,
      field: "TechG",
      headerName: "Options",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.lycee.TechG }`,
    },
    {
      id: 7,
      field: "serieBacc",
      headerName: "Série",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.lycee.serieBacc }`,
    },
  ]