import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import axios from 'axios';

export interface NiveauStoreInterface {
    listNiveau : any[] | any;
    getNiveau : () => void;
    updateNiveau : (data: any) => void;
    deleteNiveau : (id: string) => void;
    createNiveau : (data: any) => void;
}

class NiveauStore implements NiveauStoreInterface {
    @observable listNiveau = [];

    constructor() {
        makeObservable(this);
    }

    @action getNiveau = async() => {
        try {
            const allniveau = await axios.get(`${config.baseURL}/niveau`)
            const datas = allniveau.data;

            const returnedArray: any = [];
            for (let i = 0; i < datas.length; i++) {
                returnedArray.push({
                    ...datas[i],
                    id: datas[i]._id
                })
            }
            if(returnedArray.length !== 0) {
                this.listNiveau = returnedArray
            }
        } catch (e: any) {
            console.log("cannot get all niveau")
        }
    }

    @action updateNiveau = async(data: any) => {
        try {
            const updated = await axios.patch(`${config.baseURL}/niveau`, {data})
            if(updated.data) {
                this.getNiveau()
            }
        } catch (e: any) {
            console.log("cannot update this niveau")
        }
    }

    @action deleteNiveau = async(id: string) => {
        try {
            await axios.delete(`${config.baseURL}/niveau/${id}`)

            this.getNiveau();
        } catch (e: any) {
            console.log("cannot delete one niveau")
        }
    }

    @action createNiveau = async(data: any) => {
        try {
            await axios.post(`${config.baseURL}/niveau`,  data )
            this.getNiveau()
        } catch (e: any) {
            console.log("cannot create a niveau")
        }
    }
}

export default new NiveauStore();