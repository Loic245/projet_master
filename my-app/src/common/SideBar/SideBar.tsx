import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import MomentUtils from "@date-io/moment";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { UserStoreInterface } from "../../store/userStore";
import config from "../../config";

interface IUser {
  userStore: UserStoreInterface;
}

const SideBar = (props: any) => {
  const { userStore } = props as IUser;

  const [selectedDate, setSelectedDate] = useState(moment() as any);

  const handleDateChangeCalendar = (dates: any) => {
    setSelectedDate(dates);
  };

  return (
    <Box>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid style={{ width: "100%" }}>
          <center>
            <img
              src={`${config.baseGetFile}${userStore?.user?.image}`}
              alt="User Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            />
            <p>
              <i>Bonjour, {userStore?.user?.prenom}</i>
            </p>
          </center>
        </Grid>
        <Grid style={{ paddingTop: "5rem" }}>
          <Calendar date={selectedDate} onChange={handleDateChangeCalendar} />
        </Grid>
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default inject("userStore")(observer(SideBar));
