import { Request, Response } from "express";
import { Note } from "../entity/note";
import { Annee } from "../entity/annee";

export default class NoteController {

    static saveNote = async(req: Request, res : Response) => {
        try {
            for (let i = 0; i < req.body.length; i++) {
                await Note.create({...req.body[i]})
            }

            res.status(200).send("note added successfully !")
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

    static getAllNote = async(req: Request, res: Response) => {
        try {
            const annee = await Annee.findOne()

            let note: any[] = [];
            if(annee){
                // note = await Note.find({ annee : annee.annee })
                note = await Note.aggregate([
                    {
                        $match : { annee : annee.annee }
                    },
                    {
                        $lookup : {
                            from : 'students',
                            localField : 'niveau',
                            foreignField : 'niveau',
                            as : "numberStudent"
                        }
                    },
                    {
                        $group : {
                            _id : { niveau : "$niveau", numberStudent : '$numberStudent' },
                            avgNote : { $avg : "$note" },
                            maxNote : { $max : "$note" },
                            minNote : { $min : "$note" },
                        }
                    },
                    {
                        $addFields : {
                            count : { $size : '$_id.numberStudent' }
                        }
                    },
                    {
                        $unset : "_id.numberStudent"
                    }
                ])
            }

            res.status(200).send({ message: "success" , data: note })
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

}