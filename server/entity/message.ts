import mongoose, {Schema} from "mongoose";


interface IMessage {
    source: string;
    destinataire: string;
    date: string;
    message: string;
}

const MessageSchema: Schema = new Schema ({
    source: {
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
    destinataire: {
        type: String,
        require: true
    },
});


MessageSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Message = mongoose.model<IMessage>("Message", MessageSchema);