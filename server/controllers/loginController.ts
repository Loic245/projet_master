import { Request, Response } from "express";
import { User } from "../entity/user";
import { secret_code_token } from "../utils";
const Jwt = require('jsonwebtoken');

export default class LoginController {

    static login = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            const user = await User.findOne({ nom : data.nom, password: data.password })

            if(!user){
                res.status(200).send({
                    status: 400,
                    message: 'Aucun utilisateur trouvé !'})
                return
            } else {
                const token = Jwt.sign({
                    isAuthentified : true,
                    username : data.nom,
                    connectedTime: new Date()
                }, secret_code_token)

                res.status(200).send({ status: 200 ,token })
            }
        } catch (e: any) {
            res.sendStatus(500)
        }
    }

}