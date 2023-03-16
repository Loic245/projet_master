import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import rootStore from './rootStore';

export interface authStoreInterface {
    login: (data: ILogin) => void;
    logout: () => void;
}

export interface ILogin {
    nom: string;
    password: string;
}

class authStore implements authStoreInterface {

    constructor() {
        makeObservable(this);
    }

    @action login = async(data: ILogin) => {
        try{
            const user = await axios.post(`${config.baseURL}/login`, { data })

            if(user.data.status === 200) {
                localStorage.setItem('token', user.data.token);
                const reponse = {
                    status: 200,
                    message: 'user connecté !'
                }
                rootStore.setSnackBar(true, "success", "Login correct !")
                return reponse
            } else {
                 rootStore.setSnackBar(true, "error", "Internal server error !")
            }
        } catch (e: any) {
            return rootStore.setSnackBar(true, "error", "Internal server error !")
        }
    }

    @action logout = async() => {
        try {
            localStorage.removeItem('token')
            rootStore.setSnackBar(false, "error", "Unable do disconnect !")
        } catch (e: any) {
            return rootStore.setSnackBar(true, "error", "Unable do disconnect !")
        }
    }
}

export default new authStore();