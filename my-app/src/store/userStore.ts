import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import { IAdmin, IEtudiant, IProfessor, IUser } from '../common/Interfaces';
import SnackBarComponent from '../common/SnackBar';
import rootStore from './rootStore';

export interface UserStoreInterface {
    allUser: Array<IUser>;
    allAdmin: Array<IAdmin>;
    allEtudiant:  Array<IEtudiant>;
    allProfessor: Array<IProfessor>;
    isLoading: boolean;
    getAllUser: () => void;
    createUser: (data: IUser) => void;
    createAdmin: (data: IAdmin) => void;
    createProf: (data: IProfessor) => void;
    createStudent: (data: IEtudiant) => void;
    updateUser: (data: IUser | any) => void;
    deleteUSer: (id: string) => void;
    tabsValue: number;
    setTabsValue : (data: number) => void;
}

class UserStore implements UserStoreInterface {

    @observable allUser: IUser | any = [];

    @observable allAdmin: IAdmin | any = [];

    @observable allEtudiant: IEtudiant | any = [];

    @observable allProfessor: IProfessor | any = [];

    @observable isLoading: boolean = false;

    @observable tabsValue = 0;

    constructor() {
        makeObservable(this);
    }

    @action setTabsValue = (data: number) => {
        this.tabsValue = data;
    }

    @action getAllUser = async() => {
        this.isLoading = true;
        try {
            const result = await axios.get(`${config.baseURL}/user`)
            this.allUser = result.data.user;
            this.allAdmin = result.data.admin;
            this.allEtudiant = result.data.etudiant;
            this.allProfessor = result.data.professor;
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

            await rootStore.setSnackBar(true, 'success', 'Opération réussie avec succès !');
        } catch (e: any) {
            rootStore.setSnackBar(true, 'error', 'Une erreur est survenue, veuillez réessayez plus tard !');
            console.log("Error on creating a user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action createAdmin = async(data: IAdmin) => {
        this.isLoading = true;
        try {
            const result = await axios.post(`${config.baseURL}/user/admin`, data)

            if(result.data){
                this.allAdmin = result.data
            }
            this.setTabsValue(0)

            await rootStore.setSnackBar(true, 'success', 'Opération réussie avec succès !');
        } catch (e: any) {
            rootStore.setSnackBar(true, 'error', 'Une erreur est survenue, veuillez réessayez plus tard !');
            console.log("Error on creating admin user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action createProf = async(data: IProfessor) => {
        this.isLoading = true;
        try {
            const result = await axios.post(`${config.baseURL}/user/prof`, {...data})

            if(result.data){
                this.allProfessor = result.data
            }
            this.setTabsValue(1)

            await rootStore.setSnackBar(true, 'success', 'Opération réussie avec succès !');
        } catch (e: any) {
            rootStore.setSnackBar(true, 'error', 'Une erreur est survenue, veuillez réessayez plus tard !');
            console.log("Error on creating professor user !")
        } finally {
            this.isLoading = false;
        }
    }

    @action createStudent = async(data: IEtudiant) => {
        this.isLoading = true;
        try{
            const result = await axios.post(`${config.baseURL}/user/student`, data)

            if(result.data) {
                this.allEtudiant = result.data
            }
            this.setTabsValue(2)

            await rootStore.setSnackBar(true, 'success', 'Opération réussie avec succès !');
        } catch(e: any) {
            rootStore.setSnackBar(true, 'error', 'Une erreur est survenue, veuillez réessayez plus tard !');
            console.log("Error on creating student user !")
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