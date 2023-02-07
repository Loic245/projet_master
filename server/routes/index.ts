import { Router } from "express";
import user from './user';
import role from './role';

const routes = Router();

routes.use("/user", user);
routes.use("/role", role);

export default routes;