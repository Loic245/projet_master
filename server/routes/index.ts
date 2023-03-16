import { Router } from "express";
import user from './user';
import role from './role';
import login from './login';

const routes = Router();

routes.use("/user", user);
routes.use("/role", role);
routes.use("/login", login);

export default routes;