import { Request, Response } from "express";
import { IUser } from "../common/interface";
import { User } from "../entity/user";
import { Admin } from "../entity/admin";
import { Etudiant } from "../entity/etudiant";
import { Professor } from "../entity/professor";

export default class UserController {

    static getAllUser = async(req: Request, res: Response) => {
        try {
            const user = await User.find();
            const admin = await Admin.find();
            const etudiant = await Etudiant.find();
            const professor = await Professor.find();

            res.status(200).send({
                message: "success",
                user: user,
                admin: admin,
                etudiant: etudiant,
                professor: professor
            })
        } catch(e) {
            console.log("Failed to getAllUser !")
        }
    }

    static createUser = async(req: Request, res: Response) => {
        const { payload } = req.body;
        try {
            const ifExist = await User.findOne({
                nom: payload.nom,
                prenom: payload.prenom
            })
            if(ifExist){
                return res.status(400).send("User already exists !")
            }

            await User.create({ ...payload })

            res.status(200).send({
                message: "success"
            })
        } catch (e: any) {
            console.log("Failed to create a user !")
        }
    }

    static updateUser = async(req: Request, res: Response) => {
        const id = req.params;
        const { payload } = req.body;
        try {
            await User.updateOne({
                _id: id
            },{
                ...payload
            })

            res.status(200).send({
                message: "success"
            })
        } catch (e: any) {
            console.log("Failed to update user")
        }
    }

    static deleteUser = async(req: Request, res: Response) => {
        const id = req.params;
        try {
            await User.findByIdAndDelete(id)

            res.status(200).send({
                message: "success"
            })
        } catch (e: any) {
            console.log("Failed to delete user !")
        }
    }

}