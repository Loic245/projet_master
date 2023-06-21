import axios from "axios";
import config from "../config";
import { action, observable, makeObservable } from "mobx";


export interface INotificationInterface {
    notification : any[] | [];
    getNotification : () => void;
}

class NotificationStore implements INotificationInterface {

    @observable notification = [];

    constructor() {
        makeObservable(this)
    }

    @action getNotification = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/notification`)

            if(result.data) {
                this.notification = result.data.notification
            }
        } catch (e: any) {
            console.log("Enable to get notification")
        }
    }

}

export default new NotificationStore()