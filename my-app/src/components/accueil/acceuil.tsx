import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Grid } from "@material-ui/core";
import { Card, CardContent } from "@mui/material";
import useStyles from "./style";
import { useEffect, useState } from "react";
import config from "../../config";
import Loader from "../../common/Spinner";
import { column } from "../../common/Navbar/Menu";
import { useNavigate } from "react-router-dom";

interface IAccueil {
  userStore: UserStoreInterface;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

  const history = useNavigate();

  const style = useStyles();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${config.api_strapi}accueils${config.populate_strapi}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));

    // return () => {
    //   second
    // }
  }, []);

  const handleRedirect = (path: string) => () => {
    history(path);
  };

  return (
    <>
      {data !== null ? (
        <Box
          // style={{
          //   backgroundImage: `url(${config.api_strapi_image}${data.data[0].attributes.background.data[0].attributes.formats.thumbnail.url})`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          // }}
          style={{
            width: "100%",
            height: "100vh",
            background: "#e8e3e3",
            marginTop: "-1.6rem",
          }}
        >
          <Grid className={style.welcomeText}>
            <center>
              <h1>Bienvenue sur votre espace de travail</h1>
            </center>
          </Grid>
          <Grid className={style.columnContainer}>
            {column.map((item: any) => (
              <Card
                className={style.cardStyle}
                sx={{
                  minWidth: 275,
                  maxWidth: 300,
                  display: item.permission.includes(userStore.user.role)
                    ? "block"
                    : "none",
                }}
                onClick={handleRedirect(item.path)}
              >
                <CardContent>
                  {item.component} <br /> <br /> {item.icon}
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default inject("userStore")(observer(Acceuil));
