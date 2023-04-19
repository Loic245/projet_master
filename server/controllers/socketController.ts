import { Request, Response } from "express";
import { Communique } from "../entity/communique";

export default class SocketController {

    static saveCommunique = async(req: Request, res: Response, param: any) => {

        const data = req.body;
        try {
            const result = await Communique.create({
                ...data
            })

            res.status(200).send(result)
        } catch(e: any) {
            console.log("error :::::::",e)
            res.sendStatus(500)
        }
    }

}