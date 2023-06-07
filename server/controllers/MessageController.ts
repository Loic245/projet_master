import { Request, Response } from "express";
import { Message } from "../entity/message";


export default class MessageController {

    static getAllMessage = async(req: Request, res: Response) => {
        const matricule = req.body.matricule;
        try {
            const result = await Message.find({ $or: [{ destinataire : matricule }, { source : matricule }] })
            res.status(200).send({ message : result })
        } catch (e: any) {
            console.log("Error on grabing all message")
        }
    }

    static getOneMessage = async(req: Request, res: Response) => {
        const { source, destinataire } = req.body;
        try {
            const result = await Message.find({
                $or: [
                    {
                        $and : [
                            {
                                destinataire : destinataire
                            }, 
                            {
                                source : source
                            }
                        ]
                    }, 
                    {
                        $and : [
                            {
                                destinataire : source
                            }, 
                            {
                                source : destinataire
                            }
                        ]
                    }
                ]
            })

            res.status(200).send({ message: result })
        } catch (e: any) {
            console.log("Error on grabing one message")
        }
    }

    static newMessage = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            await Message.create({...data})
            res.status(200).send('success')
        } catch (e: any) {
            console.log("Error on creating new message")
        }
    }

}