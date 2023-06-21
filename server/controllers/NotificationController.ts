import { Request, Response } from "express";
import { Notification } from "../entity/notification";


export default class NotificationController {

    static getnotification = async (req: Request, res : Response) => {
        try {
            const notif = await Notification.find()

            res.status(200).send({ notification : notif })
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

}