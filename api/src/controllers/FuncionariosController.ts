import { Request, Response } from 'express';
import { FuncionariosService } from "../services/FuncionariosService";

class FuncionariosController {
    async cadastrarFuncionario(req: Request, res: Response): Promise<Response> {
        const { cpf, local_trabalho, cargo } = req.body;
        const funcionariosService = new FuncionariosService();
        try {
            const funcionario = await funcionariosService.cadastrarFuncionario({ cpf, cargo, local_trabalho });
            return res.json(funcionario);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async cadastrarLote(req: Request, res: Response): Promise<Response> {
        const { vacina_id, quantidade, tipo_vacina, data_validade } = req.body;
        const funcionariosService = new FuncionariosService();
        try {
            const lote = await funcionariosService.cadastrarLote({ vacina_id, quantidade, tipo_vacina, data_validade});
            return res.json(lote);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }


}

export { FuncionariosController };