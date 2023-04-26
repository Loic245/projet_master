import { Request, Response } from "express";
import { Communique } from "../entity/communique";
const fs = require('file-system')

export default class CommuniqueController {

    static getAllCommunique = async(req: Request, res: Response) => {
        try {
            const data = await Communique.find()

            res.status(200).send(data)
        } catch (e: any) {
            console.log("failed to get all communique :",e)
            res.sendStatus(500)
        }
    }

    static getOneCommunique = async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const result = await Communique.findOne({
                piecejoin : {
                    $elemMatch : {
                        id : id
                    } 
                }
            })

            const onePieceJoin = result?.piecejoin;
            const oneFIle = onePieceJoin?.filter((k: any) => k.id === id);

            if(oneFIle){
                // const data = fs.readFileSync(`${__dirname.replace("\\controllers", '/uploads/communique/')}${oneFIle[0]?.path}`,{encoding:'utf8', flag:'r'});
                const data = `${oneFIle[0]?.path}`;
                // res.contentType("multipart/form-data")
                // const testString = data.toString()
                // console.log("testString :::::",testString)
                res.status(200).send({result, path: data })
            } 

        } catch (e: any) {
            console.log("Failed to get One File :",e)
            res.sendStatus(500)
        }
    }

}