import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import config from "../config";
import { jsPDF } from 'jspdf';
import Head from "../PDF/Head";


export interface NoteStoreInterface {
    note : any;
    master : any;
    saveNote : (data: any) => void;
    getAllNote : () => void;
    filterNote : (data : any) => void;
    getOneNote : (data : any, niveau: any) => void;
    hasNote: boolean;
    setHasNote: (data: boolean) => void;
}

class NoteStore implements NoteStoreInterface {

    @observable note = {};

    @observable master = {};

    @observable hasNote = false;

    constructor() {
        makeObservable(this)
    }

    @action setHasNote = (data: boolean) => {
        this.hasNote = data;
    }

    @action saveNote = async(data: any) => {
        try {
            await axios.post(`${config.baseURL}/note`, data)
        } catch (e: any) {
            console.log("Enable to save note")
        }
    }

    @action getAllNote = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/note`)
            
            if(result.data) {
                this.note = result.data.data
                this.master = result.data.master
            }
        } catch (e: any) {
            console.log("Enable to get all note")
        }
    }

    @action filterNote = async(data: any) => {
        try {
            const result = await axios.post(`${config.baseURL}/note/filter`, data)
            
            if(result.data) {
                this.note = result.data.data
                this.master = result.data.master
            }
        } catch (e: any) {
            console.log("Enable to get all note")
        }
    }

    @action getOneNote = async(data: any, niveau: any) => {
        try {
            const result = await axios.post(`${config.baseURL}/note/one/${data?._id}`, { niveau })

            if(result.data.note) {
                const doc = new jsPDF()

                Head(doc, data, result.data);
                doc.save(`Note - ${data.nomEtu}.pdf`);
            }
        } catch (e: any) {
            this.setHasNote(true)
            setTimeout(() => {
                this.setHasNote(false)
            }, 3000)
            console.log("Enable to get one note")
        }
    }

}

export default new NoteStore();