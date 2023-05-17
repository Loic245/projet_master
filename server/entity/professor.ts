import mongoose, { Schema, Document } from 'mongoose';
import { IProfessor } from '../common/interface';

const ProfessorSchema: Schema = new Schema({
    nomProf: {
        type: String,
        required: true,
    },
    prenomProf: {
        type: String,
        required: true,
    },
    adresseProf: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    sexe: {
        type: String,
        required: true,
    },
    CIN: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
    },
    matiere: [],
    image: {
        type: String,
        required: false,
    },
    matricule: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: false,
    },
});

ProfessorSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);