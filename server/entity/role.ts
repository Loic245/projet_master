import mongoose, { Schema, Document } from 'mongoose';
import { IRole } from '../common/interface';

const RoleSchema: Schema = new Schema({
    nomRole: {
        type: String,
        required: true,
    }
});

RoleSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });

export const Role = mongoose.model<IRole>("Role", RoleSchema)