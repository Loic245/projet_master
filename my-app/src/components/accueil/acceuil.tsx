import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { Box, Button, Grid } from "@material-ui/core";
import useStyles from "./style";
import { useEffect, useState } from "react";
import config from "../../config";
import Loader from "../../common/Spinner";

interface IAccueil {
  userStore: UserStoreInterface;
}

const Acceuil = (props: any) => {
  const { userStore } = props as IAccueil;

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

  return (
    <>
      {data !== null ? (
        <Box
          style={{
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${config.api_strapi_image}${data.data[0].attributes.background.data[0].attributes.formats.thumbnail.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          Hello world
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default inject("userStore")(observer(Acceuil));
