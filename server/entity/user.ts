import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../common/interface';

const UserSchema: Schema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    sexe: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
});

UserSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const User = mongoose.model<IUser>("User", UserSchema);