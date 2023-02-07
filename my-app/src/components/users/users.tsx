import { useEffect, useState } from "react"
import { inject, observer } from  "mobx-react"
import { userStore } from "../../store"
import { UserStoreInterface } from "../../store/userStore"
import Grid from "@material-ui/core/Grid"


interface IUsers {
    userStore: UserStoreInterface
}

const Users = (props: any) => {
    const { userStore } = props as IUsers;
    const [list, setList] = useState(userStore.allUser)
useEffect(() => {
   userStore.getAllUser()

}, [])

  return (
    <div>
        <Grid>
            test ftsn
        </Grid>
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Numero</td>
                        <td>Nom</td>
                        <td>Prénom</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list?.map((k:any) => (
                            <tr>
                                <td>{k.nom}</td>
                                <td>{k.prenom}</td>
                                <td>{k.mail}</td>
                                <td>{k.sexe}</td>
                                <td>{k.adresse}</td>
                            </tr>
                        )) 
                    }
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default inject('userStore')(observer(Users));