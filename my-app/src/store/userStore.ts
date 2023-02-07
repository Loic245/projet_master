import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import { IUser } from '../common/Interfaces';

export interface UserStoreInterface {
    allUser: any;
    isLoading: boolean;
    getAllUser: () => void;
    createUser: (data: IUser) => void;
    updateUser: (data: IUser | any) => void;
    deleteUSer: (id: string) => void;
}

class UserStore implements UserStoreInterface {

    @observable allUser = "";

    @observable isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action getAllUser = async() => {
        this.isLoading = true;
        try {
            const result = await axios.get(`${config.baseURL}/user`)

            this.allUser = result.data.user;
        }
        catch (e: any) {
            console.log("Error on getting all user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action createUser = async(data: IUser) => {
        this.isLoading = true;

        try {
            const result = await axios.post(`${config.baseURL}/user`, data)

            if(result.data){
                console.log("success !")
            }
        }
        catch (e: any) {
            console.log("Error on creating a user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action updateUser = async(data: IUser | any) => {
        this.isLoading = true;
        try{
            const result = await axios.patch(`${config.baseURL}/user?${data._id}`, data)

            if(result.data){
                console.log("success !")
            }
        } catch (e: any) {
            console.log("Error on updating a user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action deleteUSer = async(id: string) => {
        this.isLoading = true;
        try {
            const result = await axios.delete(`${config.baseURL}/user?${id}`)

            if(result.status === 200) {
                console.log("success !")
            }
        } catch (e: any) {
            console.log("Error on deleting a user !")
        }
    }
}

export default new UserStore();