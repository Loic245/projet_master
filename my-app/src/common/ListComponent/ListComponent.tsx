import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@material-ui/core/Box";
import useStyles from "./style";
import SearchComponent from "../SearchComponent";

interface IListComponent {
  rows: any;
  columns: GridColDef[] | any;
  handleSearch: () => void;
  createNew: () => void;
  onRowClick: (row: any) => void;
  search: string;
  setSearch: () => void;
}

const ListComponent = (props: any) => {
  const {
    rows,
    columns,
    handleSearch,
    createNew,
    onRowClick,
    search,
    setSearch,
  } = props as IListComponent;
  const classes = useStyles();

  const handleRowClick = (k: any) => {
    if (onRowClick) {
      onRowClick(k.row);
    }
  };

  return (
    <Box className={classes.dataGrid}>
      <SearchComponent
        createNew={createNew}
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      {rows.length === 0 ? (
        <div className={classes.resultatVide}>Pas de résultat !</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[5]}
          sortingOrder={["desc", "asc"]}
          getRowId={(row: any) => row.id || row._id}
        />
      )}
    </Box>
  );
};

export default ListComponent;
