import mongoose from "mongoose";
import express from "express";
import routes from "./routes";
import { baseURI } from "./utils";
let cors = require("cors")


const app = express()

// const newUser = {
//   nom: "Rakoto",
//   prenom: "Loic",
//   mail: "bradjack24ricks@gmail.com",
//   password: "12345",
//   sexe: "homme",
//   role: "etudiant",
//   createdAt: new Date()
// }

// const createUser = async() => {
//   await User.create({...newUser})

//   console.log("yes it was created !")
// }

// createUser();

mongoose.connect(`${baseURI}`)
.then(() => {
    console.log("MongoDB Connected !");
  })
  .catch((err) => console.log(err));  

app.listen(3009, () => {
    console.log(`Server started on port 3009 !`);
});

app.use(cors());

app.use("/", routes)

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
