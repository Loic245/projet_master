import mongoose, { Schema, Document } from 'mongoose';
import { INiveau } from '../common/interface';

const NiveauSchema: Schema = new Schema({
    code: {
        type: String,
        required: true,
    },
    niveau: {
        type: String,
        required: true,
    },
});

NiveauSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });

export const Niveau = mongoose.model<INiveau>("Niveau", NiveauSchema)