import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import config from "../../config";
import useStyles from "./style";

interface IProfil {
  userStore: UserStoreInterface;
}

const Profil = (props: any) => {
  const { userStore } = props as IProfil;

  const classes = useStyles();

  console.log("userStore :", userStore.user);

  return (
    <div>
      <div>
        <img
          src={`${config.baseGetFile}${userStore.user.image}`}
          alt="Photo de profile"
          className={classes.image}
        />
        <div>
          {userStore.user.nom} &nbsp; {userStore.user.prenom}
        </div>
        <div> {userStore.user.mail} </div>
      </div>
    </div>
  );
};

export default inject("userStore")(observer(Profil));
