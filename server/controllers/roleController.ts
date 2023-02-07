import { Request, Response } from "express";
import { Role } from "../entity/role";

export default class RoleController {

    static getAllRole = async(req: Request, res: Response) => {
        try {
            const result = await Role.find();

            res.status(200).send({
                message:'success',
                role: result
            })
        } catch (e: any) {
            console.log("Failed to getAllRole !")
        }
    }

    static createRole = async(req: Request, res: Response) => {
        try {
            const { payload } = req.body;

            const ifExist = await Role.findOne({payload})

            if(ifExist) {
                return res.status(400).send("Ce rôle a existe déjà !")
            }

            await Role.create({
                ...payload
            })

            res.status(200).send({
                message: 'success'
            })
        } catch (e: any) {
            console.log("Failed to create new Role !")
        }
    }

    static updateRole = async(req: Request, res:Response) => {
        try {
            const { payload } = req.body;

            const result = await Role.updateOne(
                {
                    nomRole: payload._id
                }, 
                {
                    nomRole: payload.nomRole
                })

            res.status(200).send({
                message: 'success',
                updated: result
            })
        } catch (e: any) {
            console.log("Failed to update Role !")
        }
    }

    static deleteRole = async(req: Request , res: Response) => {
        try {
            const idDeleted = req.body;
            await Role.findByIdAndDelete(idDeleted)

            res.status(200).send({
                message: 'success'
            })
        } catch (e: any) {
            console.log("Failed to delete Role !")
        }
    }

}