import { IMailtext } from "../interface";

const configMail = (data: IMailtext) => {

    const mailOptions = {
        from: `PLATEFORME <${data.from}>`,
        to: `${data.to}`,
        subject: `Mot de passe du nouvel utilisateur`,
        html: `${data.message}`
    }

    return mailOptions
}


export default configMail; 