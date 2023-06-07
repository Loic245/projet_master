import React, { useEffect, useState } from "react";
import config from "../../config";
import Loader from "../../common/Spinner";
import useStyles from "./style";

const About = () => {
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

  const classes = useStyles();

  console.log("data :", data);

  return (
    <div className={classes.container}>
      {data !== null ? (
        <>
          <div className={classes.info}>
            <img
              src={`${config.api_strapi_image}${data.data[0].attributes.logo.data[0].attributes.formats.thumbnail.url}`}
              alt="Logo de l\'établissement"
              className={classes.imageLogo}
            />
            <div>
              {data.data[0].attributes.name} <br />
              {data.data[0].attributes.adress} <br />
              {data.data[0].attributes.contact} <br />
              E-mail : {data.data[0].attributes.email} <br />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div style={{ textAlign: "justify" }}>
            {data.data[0].attributes.description}
          </div>
          <br />
          <br />
          <br />
          <img
            src={`${config.api_strapi_image}${data.data[0].attributes.image.data[0].attributes.formats.thumbnail.url}`}
            alt="Image de l\'établissement"
            className={classes.image}
          />
          <br />
          <br />
          <br />
          <div style={{ textAlign: "justify" }}>
            {data.data[0].attributes.description}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default About;
