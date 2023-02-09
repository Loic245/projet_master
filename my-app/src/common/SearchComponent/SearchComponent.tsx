import useStyles from "./style";
import { Box, TextField, Button } from "@material-ui/core";

interface ISearchComponent {
  createNew: () => void;
  handleSearch: () => void;
}

const SearchComponent = (props: any) => {
  const { createNew, handleSearch } = props as ISearchComponent;

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <TextField
        id="standard-basic"
        label="Rechercher ..."
        variant="standard"
      />
      <Button
        variant="contained"
        className={classes.button}
        size="small"
        onClick={handleSearch}
      >
        Rechercher
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={createNew}
      >
        Créer
      </Button>
    </Box>
  );
};

export default SearchComponent;
