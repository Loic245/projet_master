import mongoose, {Schema} from "mongoose";


interface INotification {
    date: string;
    message: string;
    vue: number;
}

const NotificationSchema: Schema = new Schema ({
    date: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    vue: {
        type: Number,
        require: false,
        default : 0
    },
});


NotificationSchema.method("transform", function () {
    const obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;
  
    return obj;
  });
  
  export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);