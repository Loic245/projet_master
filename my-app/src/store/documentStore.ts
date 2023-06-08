import { action, observable, makeObservable } from "mobx";
import axios from "axios";
import config from "../config";

interface IDocument {
    url : string;
    name : string;
    date : string;
}

export interface DocumentStoreInterface {
    allDocument : any;
    getAllDocument : () => void;
    saveDocument : (data : IDocument) => void;
}

class DocumentStore implements DocumentStoreInterface {

    @observable allDocument = {};

    constructor () {
        makeObservable(this)
    }

    @action getAllDocument = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/document`);
            console.log("result:",result)
            if(result.data) {
                this.allDocument = result.data.document;
            }
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    @action saveDocument = async(data : IDocument) => {
        try {
            const result = await axios.post(`${config.baseURL}/document`, data)
            if(result.data) {
                this.getAllDocument()
            }
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

}

export default new DocumentStore();