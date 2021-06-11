import {Router} from 'express';
import { AdministradoresController } from './controllers/AdministradoresController';
import { CidadaosController } from './controllers/CidadaosController';
import { FuncionariosController } from './controllers/FuncionariosController';
import { VacinacoesController } from './controllers/VacinacaoController';

const routes = Router();

const cidadaosController = new CidadaosController();
const funcionarioController = new FuncionariosController();
const adminController = new AdministradoresController();
const vacinacoesController = new VacinacoesController();

routes.post("/cidadao", cidadaosController.cadastrarUsuario);
routes.get("/cidadao/:cpf", cidadaosController.listarUsuario);
routes.get("/cidadao/vacinacao/:cpf", cidadaosController.consultarEstagioVacinacao);
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
routes.get("/funcionario/lote", funcionarioController.listarLotes);
routes.post("/funcionarios/vacinacao", vacinacoesController.cadastrarVacinacaoCidadao);
routes.get("/funcionarios/vacinacao", vacinacoesController.listarHorariosOcupados);
routes.post("/funcionarios/vacinacao/agendar", vacinacoesController.agendarVacinacaoUsuario);
routes.post("/funcionarios/habilitar/:lote_vacina", funcionarioController.habilitarCidadao);

export {routes};