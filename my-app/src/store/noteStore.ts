import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import config from "../config";


export interface NoteStoreInterface {
    saveNote : (data: any) => void;
}

class NoteStore implements NoteStoreInterface {

    constructor() {
        makeObservable(this)
    }

    @action saveNote = async(data: any) => {
        try {
            await axios.post(`${config.baseURL}/note`, data)
        } catch (e: any) {
            console.log("Enable to save note")
        }
    }

}

export default new NoteStore();