import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from '../common/interface';

const AdminSchema: Schema = new Schema({
    nomAdmin: {
        type: String,
        required: true,
    },
    prenomAdmin: {
        type: String,
        required: true,
    },
    adresseAdmin: {
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
    poste: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    matricule : {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: false,
    },
});

AdminSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);