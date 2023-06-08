import mongoose from "mongoose";
import express from "express";
import { jsonParser } from "./utils";
import routes from "./routes";
import { baseURI } from "./utils";
import { Communique } from "./entity/communique";
let cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
const fs = require("file-system")


const app = express()

const server = http.createServer(app)
app.use(cors());

const io = new Server(server, {
  cors : {
    origin : 'http://localhost:3000',
    methods : ['GET','POST','PUT','PATCH','HEAD'],
  },
})

io.on("connection" , (socket: any) => {

  socket.on("send_message_communique", async(data: any) => {

    const result = await Communique.create({
      ...data
    })

    io.emit("receive_message_communique", data)
  })

  socket.on("send_message", async(data: any) => {
    io.emit("receive_message", data)
  })
})

server.listen(3009, () => {
  console.log("Server started on port 3009 !")
})

mongoose.connect(`${baseURI}`)
.then(() => {
    console.log("MongoDB Connected !");
  })
  .catch((err) => console.log(err));  

app.use(jsonParser);

app.use("/", routes)

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
