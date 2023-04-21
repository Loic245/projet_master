import { Request, Response } from "express";
import path from 'path';
import { Communique } from "../entity/communique";

export default class DownLoadFileController {

    static getFile = async(req: Request, res: Response) => {
        const param = req.params;
        try {
            const data = await Communique.findOne({ 
                piecejoin : {
                    $elemMatch : {
                        id : param
                    } 
                }
             })

            res.status(200).send({
                status : 'success',
                data
            })
        } catch (e: any) {
            console.log("error on getFile : ",e)
            res.sendStatus(500)
        }
    }

}