import {Router} from 'express';
import { CidadaosController } from './controllers/CidadaosController';

const routes = Router();

const cidadaosController = new CidadaosController();

routes.post("/cidadaos", cidadaosController.cadastrarUsuario)

export {routes};