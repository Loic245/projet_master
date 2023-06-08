import mongoose, {Schema} from "mongoose";


interface IDocument {
    url : string;
    name : string;
    date: string;
}

const DocumentSchema: Schema = new Schema ({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
});


DocumentSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Document = mongoose.model<IDocument>("Document", DocumentSchema);