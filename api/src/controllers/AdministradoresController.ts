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

    async cadastrarFabricante(req : Request, res : Response): Promise<Response> {
        const {nome, pais} = req.body;
        const adminService = new AdministradoresService();
        try {
            const listaFuncionarios = await adminService.cadastrarFabricante({nome, pais});
            return res.json(listaFuncionarios);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async listarFabricantes(req : Request, res : Response): Promise<Response> {
        const adminService = new AdministradoresService();
        try {
            const listaFabricantes = await adminService.listarFabricantes();
            return res.json(listaFabricantes);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async cadastrarVacina(req : Request, res : Response): Promise<Response> {
        const {nome, fabricante_id, num_doses_necessarias, intervalo_entre_doses} = req.body;
        const adminService = new AdministradoresService();
        try {
            const vacina = await adminService.cadastrarVacina({nome, fabricante_id, num_doses_necessarias, intervalo_entre_doses});
            return res.json(vacina);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async listarTiposDeVacina(req : Request, res : Response): Promise<Response> {
        const adminService = new AdministradoresService();
        const tiposVacina = await adminService.listarTiposDeVacina();
        return res.json(tiposVacina);
    }

    async listarVacinas(req : Request, res : Response): Promise<Response> {
        const adminService = new AdministradoresService();
        try {
            const listaVacinas = await adminService.listarVacinas();
            return res.json(listaVacinas);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

}
export { AdministradoresController };