import { Request, Response } from "express";
import { Niveau } from "../entity/niveau";

export default class NiveauController {

    static createNiveau = async(req: Request, res: Response) => {
        const data = req.body;
        try {
            const newNiveau = await Niveau.create({
                ...data
            })

            res.status(200).send(newNiveau)
        } catch(e: any) {
            console.log("error ::::::",e)
            res.sendStatus(500)
        }
    }

    static getNiveau = async(req: Request, res: Response) => {
        try {
            const allNiveau = await Niveau.find()

            res.status(200).send(allNiveau)
        } catch(e: any) {
            console.log("error ::::::",e)
            res.sendStatus(500)
        }
    }

    static updateNiveau = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            await Niveau.updateOne({
                _id : data._id
            }, {
                $set : {
                    code : data.code,
                    niveau : data.niveau
                }
            })

            res.status(200).send('updated successfully !')
        } catch(e: any) {
            console.log("error ::::::",e)
            res.sendStatus(500)
        }
    }

    static deleteNiveau = async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await Niveau.deleteOne({ _id : id })

            res.status(200).send('deleted successfully !')
        } catch(e: any) {
            console.log("error ::::::",e)
            res.sendStatus(500)
        }
    }

}