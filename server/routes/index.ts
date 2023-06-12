import { Router } from "express";
import user from './user';
import role from './role';
import login from './login';
import socket from './socket';
import uploadFile from './uploadFile';
import Communique from './communique';
import Niveau from './niveau';
import Matiere from './matiere';
import Message from './message';
import Document from './document';
import Autre from './autre';
import Note from './note';

const routes = Router();

routes.use("/user", user);
routes.use("/role", role);
routes.use("/login", login);
routes.use("/socket", socket);
routes.use("/upload", uploadFile);
routes.use('/communique', Communique);
routes.use('/niveau', Niveau);
routes.use('/matiere', Matiere);
routes.use('/message', Message);
routes.use('/document', Document);
routes.use('/autre', Autre);
routes.use('/note', Note)

export default routes;