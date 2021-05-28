import {Router} from 'express';
import { AdministradoresController } from './controllers/AdministradoresController';
import { CidadaosController } from './controllers/CidadaosController';
import { FuncionariosController } from './controllers/FuncionariosController';

const routes = Router();

const cidadaosController = new CidadaosController();
const funcionarioController = new FuncionariosController();
const adminController = new AdministradoresController();

routes.post("/cidadao", cidadaosController.cadastrarUsuario);
routes.get("/cidadao/:cpf", cidadaosController.listarUsuario);
routes.post("/funcionario", funcionarioController.cadastrarFuncionario);
routes.get("/admin/listarPendentes", adminController.listarFuncionariosPendentes);
routes.post("/admin/aprovar", adminController.aprovarCadastroFuncionario);
routes.get("/admin/listarFuncionarios", adminController.listarFuncionarios);

export {routes};