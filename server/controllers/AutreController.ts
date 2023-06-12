import { Request, Response } from 'express';
import { Autre } from '../entity/autre';
import { Annee } from '../entity/annee';
import { Professor } from '../entity/professor';
import { Etudiant } from '../entity/etudiant';

export default class AutreController {

    static saveAnnee = async(req: Request, res: Response) => {

        try {
            await Annee.create({...req.body });

            res.status(200).send("created successfully")
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static getAnnee = async(req: Request, res: Response) => {
        try {
            const result = await Annee.find();

            res.status(200).send({ annee : result[0] })
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static updateAnnee = async(req: Request, res: Response) => {

        try {
            await Annee.updateOne({ _id : req.body.id }, { annee : req.body.annee })

            res.status(200).send("updated successfully")
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static saveData = async(req: Request, res: Response) => {

        try {
            await Autre.create({ periode : req.body.data })

            res.status(200).send("created successfully")
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static getData = async(req: Request, res: Response) => {
        
        try {
            const result = await Autre.find();

            res.status(200).send({ autre : result })
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static getMatiereParProf = async(req: Request, res: Response) => {
        try {
            // const result = await Professor.find({ matricule : req.params.matricule })
            const result = await Professor.aggregate([
                {
                    $match : {
                        matricule : req.params.matricule
                    }
                },
                {
                    $project : {
                        matiere : 1
                    }
                }
            ])

            res.status(200).send({ list : result })
        } catch (e: any) {
            console.log("Internal server error !")
        }
    }

    static getListNoteEtudiant = async(req: Request, res: Response) => {
        try {
            const result = await Etudiant.find({ niveau : req.params.niveau })

            let finalresult : any[] = [];
            for (let i = 0; i < result.length; i++) {
                const oneData = JSON.stringify(result[i]);
                const parsedData = JSON.parse(oneData);
                finalresult.push({
                    ...parsedData,
                    id : i,
                    note : ''
                })
            }

            res.status(200).send({ list : finalresult })
        } catch (e: any) {
            console.log("Internal server error !",e)
        }
    }

}