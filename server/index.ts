import mongoose from "mongoose";
import express from "express";
import { jsonParser } from "./utils";
import routes from "./routes";
import { baseURI } from "./utils";
let cors = require("cors")


const app = express()

mongoose.connect(`${baseURI}`)
.then(() => {
    console.log("MongoDB Connected !");
  })
  .catch((err) => console.log(err));  

app.listen(3009, () => {
    console.log(`Server started on port 3009 !`);
});

app.use(cors());
app.use(jsonParser);

app.use("/", routes)

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
