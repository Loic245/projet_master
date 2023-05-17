export interface IUser {
    nom: String;
    prenom: String;
    password: String;
    mail: String;
    sexe: String;
    role: String;
    createdAt: Date;
    matricule: string;
}

export interface IProfessor {
    nomProf: String;
    prenomProf: String;
    adresseProf: String;
    mail: String;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: String;
    sexe: String;
    matiere: String[];
    createdAt: Date;
    matricule: string;
}

export interface IAdmin {
    nomAdmin: String;
    prenomAdmin: String;
    adresseAdmin: String;
    mail: String;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: String;
    sexe: String;
    poste: String;
    createdAt: Date;
    matricule: string;
}

export interface IEtudiant {
    nomEtu: String;
    prenomEtu: String;
    adresseEtu: String;
    mail: String;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: String;
    sexe: String;
    lycee: ILycee;
    createdAt: Date;
    matricule: string;
}

export interface IRole {
    nomRole: String;
}

export interface INiveau {
    code: String;
    niveau: String;
}

export interface IMatiere {
    matiere: String;
    niveau : String;
}

export interface ILycee {
    serieBacc: String;
    nomLycee: String;
    TechG: String;
}

export interface IMailtext {
    from: string;
    to: string;
    mdp: string;
    client?: string;
    message?: string | any;
}