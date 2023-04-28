import { Request, Response } from "express";
import { User } from "../entity/user";
import { secret_code_token } from "../utils";
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default class LoginController {

    static login = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            const user = await User.findOne({ nom : data.nom })

            
            if(!user){
                res.status(200).send({
                    status: 400,
                    message: 'Aucun utilisateur trouvé !'})
                    return
                } else {
                    const checkPassword = bcrypt.compareSync( data.password , user?.password )
                    if(checkPassword) {
                        const token = Jwt.sign({
                            isAuthentified : true,
                            username : data.nom,
                            connectedTime: new Date()
                        }, secret_code_token)
        
                        return res.status(200).send({ status: 200 ,token })
                    } 

                    return res.status(403).send('Mot de passe incorrect')
            }
        } catch (e: any) {
            res.sendStatus(500)
        }
    }

}