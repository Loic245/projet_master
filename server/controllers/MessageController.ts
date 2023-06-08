import { Request, Response } from "express";
import { Message } from "../entity/message";
import { User } from "../entity/user";


export default class MessageController {

    static getAllMessage = async(req: Request, res: Response) => {
        const matricule = req.params.matricule;
        try {
            const result = await Message.aggregate([
                {
                    $match : { $or: [{ destinataire : matricule }, { source : matricule }] }
                }, 
                {
                    $group : { 
                        _id: '$destinataire',
                        message : { $first : '$message' },
                        source : { $first : '$source' },
                        destinataire : { $first : '$destinataire' },
                        date : { $first : '$date' }
                    }
                },             
                {
                    $lookup : {
                            from : 'users',
                            localField : 'destinataire',
                            foreignField : 'matricule',
                            as : "user"
                    },
                },
            ])
            
            res.status(200).send({ message : result })
        } catch (e: any) {
            console.log("Error on grabing all message")
        }
    }

    static getOneMessage = async(req: Request, res: Response) => {
        const { source, destinataire } = req.body.data;
        try {
            // const result = await Message.find({
            //     $or: [
            //         {
            //             $and : [
            //                 {
            //                     destinataire : destinataire
            //                 }, 
            //                 {
            //                     source : source
            //                 }
            //             ]
            //         }, 
            //         {
            //             $and : [
            //                 {
            //                     destinataire : source
            //                 }, 
            //                 {
            //                     source : destinataire
            //                 }
            //             ]
            //         }
            //     ]
            // })

            const result = await Message.aggregate([
                {
                    $match : { 
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
                     }
                },         
                {
                    $lookup : {
                            from : 'users',
                            localField : 'destinataire',
                            foreignField : 'matricule',
                            as : "user"
                    },
                },
            ])

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