import { Request, Response } from 'express';
import { Document } from '../entity/document';

export default class DocumentController {

    static saveDocument = async(req: Request, res: Response) => {
        try {
            await Document.create({...req.body})
            res.status(200).send('success')
        } catch (e: any) {
            console.log("Failed to save Document !")
        }
    }

    static getAllDocument = async(req: Request, res: Response) => {
        try {
            const result = await Document.find();
            res.status(200).send({ document : result })
        } catch (e: any) {
            console.log("Failed to get All document !")
        }
    }

}