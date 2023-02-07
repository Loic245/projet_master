export interface IUser {
    nom: string;
    prenom: string;
    password: string;
    sexe: string;
    role: string;
    createdAt: Date | any;
}

export interface IProfessor {
    nomProf: string;
    prenomProf: string;
    adresseProf: string;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: string;
    sexe: string;
    matiere: string[];
    createdAt: Date;
}

export interface IAdmin {
    nomAdmin: string;
    prenomAdmin: string;
    adresseAdmin: string;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: string;
    sexe: string;
    poste: string;
    createdAt: Date;
}

export interface IEtudiant {
    nomEtu: string;
    prenomEtu: string;
    adresseEtu: string;
    CIN: Number;
    birthday: Date | any;
    placeOfBirth: string;
    sexe: string;
    lycee: ILycee;
    createdAt: Date;
}

export interface IRole {
    nomRole: string;
}

export interface INiveau {
    code: string;
    niveau: string;
}

export interface IMatiere {
    matiere: string;
    niveau : string;
}

export interface ILycee {
    serieBacc: string;
    nomLycee: string;
    TechG: string;
}