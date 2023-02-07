import mongoose, { Schema, Document } from 'mongoose';
import { IMatiere } from '../common/interface';

const MatiereSchema: Schema = new Schema({
    matiere: {
        type: String,
        required: true,
    },
    niveau: {
        type: String,
        required: true,
    },
});

MatiereSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });

export const Matiere = mongoose.model<IMatiere>("Matiere", MatiereSchema)