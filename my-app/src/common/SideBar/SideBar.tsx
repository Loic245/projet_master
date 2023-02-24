import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const SideBar = () => {
  const [selectedDate, setSelectedDate] = useState(moment() as any);

  const handleDateChangeCalendar = (dates: any) => {
    setSelectedDate(dates);
  };

  return (
    <Box>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid style={{ width: "100%" }}>
          <Calendar date={selectedDate} onChange={handleDateChangeCalendar} />
        </Grid>
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default SideBar;
