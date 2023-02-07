import  { useNavigate }  from 'react-router-dom';
import { inject, observer } from  "mobx-react"
import { UserStoreInterface } from '../../store/userStore';

interface IAccueil {
  userStore: UserStoreInterface
}

const  Acceuil = (props: any) => {

  const { userStore } = props as IAccueil;

  const history = useNavigate();

  const gotoAdmin = () => {
    history("/administrateur")
  }

  const gotoProf = () => {
    history("/professeur")
  }

  const gotoStudient = () => {
    history("/etudiant")
  }

  const gotoUser = () => {
    userStore.getAllUser()
    history("/users")
  }

  return (
    <div>
      <head>
        Accueil
      </head>
      <div>
        <li>
          <ul onClick={gotoAdmin}>Administrateurs</ul>
          <ul onClick={gotoProf}>Professeurs</ul>
          <ul onClick={gotoStudient}>Etudiants</ul>
          <ul onClick={gotoUser}>Users</ul>
        </li>
      </div>
    </div>
  )
}

export default inject('userStore')(observer(Acceuil))