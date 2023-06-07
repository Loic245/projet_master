import { action, makeObservable, observable } from "mobx";
import config from "../config";
import axios from "axios";

interface OneMessage { 
    source : string;
    destinataire : string 
}

export interface MessageStoreInterface {
    allMessage : any[];
    oneMessageData : any[];
    getAllMessage : (matricule : string) => void;
    getOneMessage : (one: OneMessage) => void;
    newMessage : (data: any) => void;
}

class MessageStore implements MessageStoreInterface {

    @observable allMessage = [];

    @observable oneMessageData = [];

    constructor () {
        makeObservable(this)
    }

    @action getAllMessage = async(matricule: string) => {
        try {
            const result = await axios.get(`${config.baseURL}/message`, { data: matricule })
            if(result.data) {
                this.allMessage = result.data.message;
            }
        } catch (e: any) {
            console.log("Internal server error")
        }
    }

    @action getOneMessage = async(one: OneMessage) => {
        try {
            const result = await axios.get(`${config.baseURL}/message/one`, { data: one })
            if(result.data) {
                this.oneMessageData = result.data.message;
            }
        } catch (e: any) {
            console.log("Internal server error")
        }
    }

    @action newMessage = async(data: any) => {
        try {
            const result = await axios.post(`${config.baseURL}/message`, { data })
            if(result.data) {
                this.getAllMessage(data.source)
                this.getOneMessage({ source : data.souce, destinataire : data.destinataire})
            }
        } catch (e: any) {
            console.log("Internal server error")
        }
    }

}

export default new MessageStore();