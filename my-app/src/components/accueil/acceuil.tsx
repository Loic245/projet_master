import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Button, Grid } from "@material-ui/core";
import useStyles from "./style";

interface IAccueil {
  userStore: UserStoreInterface;
}

interface Idata {
  path: string;
  component: string;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

  const style = useStyles();

  const history = useNavigate();

  const handleRedirect = (data: string) => () => {
    history(data);
  };

  const column = [
    {
      path: "/users",
      component: "Utilisateurs",
    },
    {
      path: "/",
      component: "Mon compte",
    },
    {
      path: "/parametre",
      component: "Paramètre",
    },
    {
      path: "/",
      component: "Mes documents",
    },
  ];

  return (
    <Box style={{ display: "flex", flexWrap: "wrap" }}>
      {column.map((data: Idata) => (
        <Grid xs={6} sm={6} md={6} lg={6} className={style.container}>
          <Grid
            onClick={handleRedirect(`${data.path}`)}
            className={style.dataGrid}
          >
            {data.component}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default inject("userStore")(observer(Acceuil));
