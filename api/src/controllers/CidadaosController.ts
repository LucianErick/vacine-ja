import { Request, Response } from 'express';
import { CidadaosService } from "../services/CidadaosService";

class CidadaosController {
    async cadastrarUsuario(req: Request, res: Response): Promise<Response> {
        const { cpf, nome, endereco, num_cartao_sus, email, data_nascimento, telefone, profissao, comorbidade } = req.body;
        const cidadaosService = new CidadaosService();
        try {
            const cidadao = await cidadaosService.cadastrarCidadao({ cpf, nome, endereco, num_cartao_sus, email, data_nascimento, telefone, profissao, comorbidade })
            return res.json(cidadao);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async listarUsuario(req : Request, res : Response): Promise<Response> {
        const { cpf } = req.params;
        const cidadaosService = new CidadaosService();
        try {
            const cidadao = await cidadaosService.listarInformacoesCidadao(cpf);
            return res.json(cidadao);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

export { CidadaosController };