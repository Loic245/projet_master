import mongoose, {Schema} from "mongoose";


interface IAnnee {
    annee : string;
}

const AnneeSchema: Schema = new Schema ({
    annee: {
        type: String,
        require: true
    },
});


AnneeSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Annee = mongoose.model<IAnnee>("Annee", AnneeSchema);