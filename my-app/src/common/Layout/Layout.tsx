import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar";
import { Box, Grid } from "@material-ui/core";
import { FC } from "react";

interface IProps {
  children: any;
}

const Layout: FC<IProps> = (props) => {
  const { children } = props as IProps;
  return (
    <Box>
      <Grid style={{ position: "fixed", width: "100%", marginBottom: "5rem" }}>
        <NavBar />
      </Grid>
      <Grid>
        <SideBar />
      </Grid>
      <Grid style={{ position: "relative" }}>{children}</Grid>
    </Box>
  );
};

export default Layout;
