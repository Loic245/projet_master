import mongoose, {Schema} from "mongoose";


interface INote {
    periode : String;
    annee : String;
    etudiant : String;
    note : Number;
    matiere : String;
    prof : String;
    niveau : String;
}

const NoteSchema: Schema = new Schema ({
    periode: {
        type: String,
        required : true
    },
    annee: {
        type: String,
        required : true
    },
    etudiant: {
        type: String,
        required : true
    },
    note: {
        type: Number,
        required : true
    },
    matiere: {
        type: String,
        required : true
    },
    prof: {
        type: String,
        required : true
    },
    niveau: {
        type: String,
        required : true
    },
});


NoteSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Note = mongoose.model<INote>("Note", NoteSchema);