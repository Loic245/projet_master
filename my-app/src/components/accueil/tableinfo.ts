import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

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