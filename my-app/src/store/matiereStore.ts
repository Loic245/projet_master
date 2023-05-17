import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import axios from 'axios';

export interface MatiereInterface {
    listMatiere : any [] | [];
    createMatiere : (data : any) => void;
    getAllMatiere : () => void;
    niveauMatiere : any[];
    setNiveauMatiere : (data: any) => void;
}

class MatiereStore implements MatiereInterface {

    @observable listMatiere = [];

    @observable niveauMatiere: any[] = [];

    constructor() {
        makeObservable(this);
    }

    @action setNiveauMatiere = (data : any) => {
        if(data){
            this.niveauMatiere.push(data)
        }
    }

    @action getAllMatiere = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/matiere`)
            const datas = result.data;

            const returnedArray: any = [];
            for (let i = 0; i < datas.length; i++) {
                returnedArray.push({
                    ...datas[i],
                    id: datas[i]._id
                })
            }
            if(returnedArray.length !== 0) {
                this.listMatiere = returnedArray
            }
        } catch (e: any) {
            console.log("Error on getting matiere :",e)
        }
    }

    @action createMatiere = async(data: any) => {
        try {
            const create = await axios.post(`${config.baseURL}/matiere`, data)
            await this.getAllMatiere()
        } catch (e: any) {
            console.log("Error on creating matiere :",e)
        }
    }

}

export default new MatiereStore();