import { Request, Response } from 'express';
import { AdministradoresService } from '../services/AdministradoresService';
import { CidadaosService } from "../services/CidadaosService";
import { FuncionariosService } from '../services/FuncionariosService';

class AdministradoresController {

    async listarFuncionariosPendentes(req : Request, res : Response): Promise<Response> {
        const funcionariosServices = new FuncionariosService();

        try {
            const listaFuncionarios = await funcionariosServices.listarFuncionariosPendentes();
            return res.json(listaFuncionarios);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async aprovarCadastroFuncionario(req : Request, res : Response): Promise<Response> {
        const {cpf, aprovado} = req.body;
        const adminService = new AdministradoresService();
        try {
            const funcionario = await adminService.aprovarCadastroFuncionario({cpf, aprovado});
            return res.json(funcionario);
        } catch (err) {
            return res.status(404).json({
                message: err.message
            })
        }
    }

    async listarFuncionarios(req : Request, res : Response): Promise<Response> {
        const adminService = new AdministradoresService();
        try {
            const listaFuncionarios = await adminService.listarFuncionarios();
            return res.json(listaFuncionarios);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

export { AdministradoresController };