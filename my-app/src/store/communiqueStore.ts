import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import axios from 'axios';


export interface ICommunique {
    user: string;
    date: string;
    message : string;
    piecejoin : any[];
}

export interface CommuniqueStoreInterface {
    listCommunique : ICommunique[] | [];
    oneFile : any;
    getAllCommunique : () => void;
    getOneFile : (id: string) => void;
}

class CommuniqueStore implements CommuniqueStoreInterface {
    @observable listCommunique = [];

    @observable oneFile: any;

    constructor() {
        makeObservable(this);
    }

    @action getAllCommunique = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/communique`)
            if(result) {
                this.listCommunique = result.data;
            }
        } catch (e: any) {
            console.log("error in communique store :",e)
        }
    }

    @action getOneFile = async(id: string) => {
        try {
            const oneResult = await axios.get(`${config.baseURL}/communique/getOne/${id}`)
            if(oneResult) {
                this.oneFile = oneResult.data
            }
        } catch (e: any) {
            console.log("error one getting one file :",e)
        }
    }


}

export default new CommuniqueStore();