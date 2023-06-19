import { Request, Response } from "express";
import { Note } from "../entity/note";
import { Annee } from "../entity/annee";
import { Niveau } from "../entity/niveau";
import { Matiere } from '../entity/matiere';
import { Autre } from "../entity/autre";

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
            let noteMaster: any[] = [];
            if(annee){
                // note = await Note.find({ annee : annee.annee })
                note = await Note.aggregate([
                    {
                        $match : { annee : annee.annee, niveau : { $regex : 'L', $options : "i" } }
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
                    }, 
                    {
                        $sort : { '_id.niveau' : 1 }
                    }
                ])
                noteMaster = await Note.aggregate([
                    {
                        $match : { annee : annee.annee, niveau : { $regex : 'M', $options : "i" } }
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
                    }, 
                    {
                        $sort : { '_id.niveau' : 1 }
                    }
                ])
            }

            res.status(200).send({ message: "success" , data: note, master: noteMaster })
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

    static filterNote = async(req: Request, res: Response) => {

        const { annees, periode } = req.body;

        try {

            let note: any[] = [];
            let noteMaster: any[] = [];
            if(annees){
                note = await Note.aggregate([
                    {
                        $match : { annee : annees, periode : periode, niveau : { $regex : 'L', $options : "i" } }
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
                    }, 
                    {
                        $sort : { '_id.niveau' : 1 }
                    }
                ])
                noteMaster = await Note.aggregate([
                    {
                        $match : { annee : annees, periode : periode, niveau : { $regex : 'M', $options : "i" } }
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
                    }, 
                    {
                        $sort : { '_id.niveau' : 1 }
                    }
                ])
            }

            res.status(200).send({ message: "success" , data: note, master: noteMaster })
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

    static getOneNote = async(req: Request, res: Response) => {
        const id = req.params.id;
        const niveau = req.body.niveau;

        try {
            const result = await Note.aggregate([
                {
                    $match : { etudiant : id, niveau : niveau }
                }
            ])
            const niveaux = await Niveau.find();
            const matiere = await Matiere.find();
            const periode = await Autre.find();

            res.status(200).send({ note : result, niveaux, matiere, periode })
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

}