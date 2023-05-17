import mongoose, { Schema, Document, Mongoose } from 'mongoose';
import { IEtudiant } from '../common/interface';


const LyceeSchema: Schema = new Schema ({
    serieBacc: {
        type: String,
        required: false
    },
    nomLycee: {
        type: String,
        required: true
    },
    TechG: {
        type: String,
        required: true
    }
})

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
    lycee: {
        type: LyceeSchema
    },
    image: {
        type: String,
        required: false,
    },
    matricule : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: false,
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