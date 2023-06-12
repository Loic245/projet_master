import mongoose, {Schema} from "mongoose";


interface IAutre {
    periode : String;
}

const AutreSchema: Schema = new Schema ({
    periode: {
        type: String,
        required : true
    },
});


AutreSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Autre = mongoose.model<IAutre>("Autre", AutreSchema);