import mongoose, { Schema, Document, Mongoose } from 'mongoose';
import { IEtudiant } from '../common/interface';

const StudentSchema: Schema = new Schema({
    nomEtu: {
        type: String,
        required: true,
    },
    prenomEtu: {
        type: String,
        required: true,
    },
    adresseEtu: {
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
    lycee: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
});

StudentSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Etudiant = mongoose.model<IEtudiant>("Student", StudentSchema);