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
routes.get("/admin/funcionarios", adminController.listarFuncionarios);
routes.get("/admin/fabricantes", adminController.listarFabricantes);
routes.post("/admin/fabricantes", adminController.cadastrarFabricante);
routes.post("/admin/vacinas", adminController.cadastrarVacina);
routes.get("/admin/vacinas/tipos", adminController.listarTiposDeVacina);
routes.get("/admin/vacinas", adminController.listarVacinas);
routes.post("/funcionario/lote", funcionarioController.cadastrarLote);

export {routes};