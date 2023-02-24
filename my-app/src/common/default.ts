import { IAdmin, IEtudiant, ILycee, IProfessor, IUser } from "./Interfaces"

export const userDefault: IUser = {
    nom: '',
    prenom: '',
    password: '',
    sexe: '',
    role: '',
}

export const adminDefault: IAdmin = {
    nomAdmin: '',
    prenomAdmin: '',
    adresseAdmin: '',
    CIN: '',
    birthday: '',
    placeOfBirth: '',
    sexe: '',
    poste: '',
}

export const defaultProf: IProfessor = {
    nomProf: "",
    prenomProf: "",
    adresseProf: "",
    CIN: "",
    birthday: '',
    placeOfBirth: "",
    sexe: "",
    matiere: [],
}

export const defaultLycee: ILycee = {
    serieBacc: '',
    nomLycee: '',
    TechG: '',
}

export const defaultStudent: IEtudiant = {
    nomEtu: '',
    prenomEtu: '',
    adresseEtu: '',
    CIN: '',
    birthday: '',
    placeOfBirth: '',
    sexe: '',
    lycee: defaultLycee,
}