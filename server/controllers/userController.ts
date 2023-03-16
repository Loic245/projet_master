import { Request, Response } from "express";
import { IMailtext, IUser } from "../common/interface";
import { User } from "../entity/user";
import { Admin } from "../entity/admin";
import { Etudiant } from "../entity/etudiant";
import { Professor } from "../entity/professor";
import nodemailer from 'nodemailer';
import MailText from '../common/MailText';
import { mailConfig } from "../utils";


const welcomeMessage = (data: string, mdp: string) => {
    const text = `<!DOCTYPE html>
    <html lang=fr>
    
    <head>
        Bonjour Mr/Mme ${data},</br>

        Nous sommes heureux de vous compter parmi nous. </br></br>
    </head>
    
    <body>
    Votre mot de passe pour accéder à la plateforme est : ${mdp}. </br></br>
    Bonne navigation.
    </body>
    
    </html>`
    return text
}
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

    static getAllAdmin = async(req: Request, res: Response) => {
        try {
            const result = await Admin.find();

            res.status(200).send(result)
        } catch(e: any) {
            res.sendStatus(500)
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

    static createAdmin = async(req: Request, res: Response) => {
        try {
            const result = await Admin.create(req.body);

            const transporter = nodemailer.createTransport(mailConfig);

            // const dataMail: IMailtext = {
            //     from : 'rakotoarintsifaloic@gmail.com',
            //     to : 'bradjack24ricks@gmail.com',
            //     mdp : '123456',
            //     client : `${req.body.nomAdmin}`,
            //     message: welcomeMessage(req.body.nomAdmin, '123456')
            // }

            // await transporter.sendMail(MailText(dataMail), function (error: any, info: any) {
            //     if (error) {
            //         console.log(error);
            //         return res.status(500).send('error in send mail to new user !')
            //     } else {
            //       console.log("Email sent: " + info.response);
            //     }
            //   });

            res.status(200).send(result)
        } catch (e: any) {
            res.status(500).send({message: "error on grabind data !", error : e})
        }
    }

    static updateAdmin = async(req: Request, res: Response) => {
        const data = req.body;
        try {
            await Admin.updateOne({ _id:  data._id }, { ...data })

            res.status(200).send('update success !')
        } catch(e: any) {
            console.log("error :", e)
            res.sendStatus(500)
        }
    }

    static deleteAdmin = async(req: Request, res: Response) => {
        const data = req.params;
        try {
            await Admin.deleteOne({_id: data.id})

            res.status(200).send('deleted successfully !')
        } catch (e: any) {
            console.log("error :", e)
            res.sendStatus(500)
        }
    }

    static searchAdmin = async(req:Request, res: Response) => {
        const payload = req.body.data;

        if(!payload) {
            return res.status(200).send("none");
        }

        try {
            const resultFilter = await Admin.find(
                {
                    $or : [
                        { nomAdmin : {$regex : payload, $options : "i"} },
                        { prenomAdmin : {$regex : payload, $options : "i"} },
                        { adresseAdmin : {$regex : payload, $options : "i"} },
                        { mail : {$regex : payload, $options : "i"} },
                        { CIN : {$regex : payload, $options : "i"} },
                        { placeOfBirth : {$regex : payload, $options : "i"} },
                        { sexe : {$regex : payload, $options : "i"} },
                        { poste : {$regex : payload, $options : "i"} }
                    ]
                }
            )

            res.status(200).send(resultFilter);
        } catch (e: any) {
            console.log("error :",e)
            res.status(500).send("Internal server error !")
        }
    }

    static getAllProf = async(req: Request, res: Response) => {
        try {
            const prof = await Professor.find()

            res.status(200).send(prof)
        } catch(e: any) {
            console.log("erro :",e)
            res.sendStatus(500)
        }
    }

    static updateProf = async(req: Request, res: Response) => {
        const data= req.body;
        try {
            const updated = await Professor.updateOne({ _id: data?._id }, {...data})

            res.status(200).send(updated)
        } catch(e: any) {
            console.log("erro :",e)
            res.sendStatus(500)
        }
    }

    static deleteProf = async(req: Request, res: Response) => {
        const data = req.params
        try {
            await Professor.deleteOne({ _id: data.id })

            res.status(200).send("delete successfully !")
        } catch(e: any) {
            console.log("erro :",e)
            res.sendStatus(500)
        }
    }

    static createProf = async(req: Request, res: Response) => {
        try {
            const result = await Professor.create(req.body)

            res.status(200).send(result)
        } catch (e: any) {
            res.status(500).send({message: "error on grabind data !", error : e})
        }
    }

    static searchProf = async(req:Request, res: Response) => {
        const payload = req.body.data;

        if(!payload) {
            return res.status(200).send("none");
        }

        try {
            const resultFilter = await Professor.find(
                {
                    $or : [
                        { nomProf : {$regex : payload, $options : "i"} },
                        { prenomProf : {$regex : payload, $options : "i"} },
                        { adresseProf : {$regex : payload, $options : "i"} },
                        { mail : {$regex : payload, $options : "i"} },
                        { CIN : {$regex : payload, $options : "i"} },
                        { placeOfBirth : {$regex : payload, $options : "i"} },
                        { sexe : {$regex : payload, $options : "i"} }
                    ]
                }
            )

            res.status(200).send(resultFilter);
        } catch (e: any) {
            res.status(500).send("Internal server error !")
        }
    }

    static getAllStudent = async(req: Request, res: Response) => {
        try {
            const student = await Etudiant.find();

            res.status(200).send(student)
        } catch (e: any) {
            return res.sendStatus(500)
        }
    }

    static createStudent = async(req: Request, res: Response) => {
        try {
            const result = await Etudiant.create(req.body)

            res.status(200).send(result)
        }catch (e: any) {
            return res.status(500).send({message: "error on creating student !", error : e})
        }
    } 

    static updateStudent = async(req: Request, res: Response) => {
        const data = req.body.data;
        try {
            await Etudiant.updateOne({ _id: data._id }, {...data})

            res.status(200).send('update successfully !')
        } catch( e: any) {
            return res.sendStatus(500)
        }
    }

    static deleteStudent = async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await Etudiant.deleteOne({ _id: id })

            res.status(200).send('deleted successfully !')
        } catch (e: any) {
            return res.sendStatus(500)
        }
    }

    static searchStudent = async(req:Request, res: Response) => {
        const payload = req.body.data;

        if(!payload) {
            return res.status(200).send("none");
        }

        try {
            const resultFilter = await Etudiant.find(
                {
                    $or : [
                        { nomEtu : {$regex : payload, $options : "i"} },
                        { prenomEtu : {$regex : payload, $options : "i"} },
                        { adresseEtu : {$regex : payload, $options : "i"} },
                        { mail : {$regex : payload, $options : "i"} },
                        { CIN : {$regex : payload, $options : "i"} },
                        { placeOfBirth : {$regex : payload, $options : "i"} },
                        { sexe : {$regex : payload, $options : "i"} },
                        { 'lycee.nomLycee' : {$regex : payload, $options : "i"} },
                        { 'lycee.serieBacc' : {$regex : payload, $options : "i"} },
                        { 'lycee.TechG' : {$regex : payload, $options : "i"} }
                    ]
                }
            )

            res.status(200).send(resultFilter);
        } catch (e: any) {
            res.status(500).send("Internal server error !")
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