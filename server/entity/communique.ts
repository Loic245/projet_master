import mongoose, {Schema} from "mongoose";

interface ICommunique {
    user: string;
    date: string;
    message: string;
    data?: any;
}

const CommuniqueSchema: Schema = new Schema ({
    user: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    data: {
        type: Schema.Types.Mixed,
        required: false
    }
});


CommuniqueSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Communique = mongoose.model<ICommunique>("Communique", CommuniqueSchema);