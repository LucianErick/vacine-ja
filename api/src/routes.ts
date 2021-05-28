import {Router} from 'express';
import { CidadaosController } from './controllers/CidadaosController';
import { FuncionariosController } from './controllers/FuncionariosController';

const routes = Router();

const cidadaosController = new CidadaosController();
const funcionarioController = new FuncionariosController();

routes.post("/cidadao", cidadaosController.cadastrarUsuario);
routes.get("/cidadao/:cpf", cidadaosController.listarUsuario);
routes.post("/funcionario", funcionarioController.cadastrarFuncionario);

export {routes};