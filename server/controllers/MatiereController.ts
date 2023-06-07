import { Request, Response } from "express";
import { Matiere } from "../entity/matiere";


export default class MatiereController {

    static createMatiere = async(req: Request, res: Response) => {
        const data = req.body;
        console.log("req body :::::::::::",req.body)
        try {
            await Matiere.create({
                ...data
            })

            res.status(200).send("created successfully !")
        } catch (e: any) {
            console.log("error on create matiere :",e)
            res.status(500).send("Error on create a matiere")
        }
    }

    static getMatiere = async(req: Request, res: Response) => {
        try {
            const matiere = await Matiere.find()

            res.status(200).send(matiere)
        } catch (e: any) {
            console.log("error on get matiere :",e)
            res.status(500).send("Error on get a matiere")
        }
    }

    static updateMatiere = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            await Matiere.updateOne({
                _id : data._id
            }, 
            {
                $set: {
                    matiere : data.matiere,
                    code : data.code
                }
            });

            res.status(200).send('updated successfully !')
        } catch (e: any) {
            console.log("error on create matiere :",e)
            res.status(500).send("Error on create a matiere")
        }
    }

    static deleteMatiere = async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await Matiere.deleteOne({ _id : id })

            res.status(200).send("deleted successfully !")
        } catch (e: any) {
            console.log("error on delete matiere :",e)
            res.status(500).send("Error on delete a matiere")
        }
    }

}