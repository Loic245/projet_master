import mongoose, {Schema} from "mongoose";


interface IPieceJoin {
    id : string,
    path : string,
    name : string,
}
interface ICommunique {
    user: string;
    date: string;
    message: string;
    data?: any;
    piecejoin?: IPieceJoin[];
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
    },
    piecejoin : {
        type: Array<IPieceJoin> ,
        default : []
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