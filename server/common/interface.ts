export interface IUser {
    nom: String;
    prenom: String;
    password: String;
    mail: String;
    sexe: String;
    role: String;
    createdAt: Date;
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