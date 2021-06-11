import { Request, Response } from 'express';
import { VacinacoesService } from '../services/VacinacaoService';

class VacinacoesController {

    async cadastrarVacinacaoCidadao(req: Request, res: Response): Promise<Response> {
        const { funcionario_id, cidadao_id, lote_id, numero_dose, data } = req.body;
        const vacinacaoService = new VacinacoesService();
        try {
            const vacinacao = await vacinacaoService.registrarVacinacao({ funcionario_id, cidadao_id, lote_id, numero_dose, data });
            return res.json(vacinacao);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async agendarVacinacaoUsuario(req: Request, res: Response): Promise<Response> {
        const { cidadao_id, data } = req.body;
        const vacinacaoService = new VacinacoesService();
        try {
            const vacinacao = await vacinacaoService.agendarVacinacao({ cidadao_id, data });
            return res.json(vacinacao);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async listarHorariosOcupados(req: Request, res: Response): Promise<Response> {
        const vacinacaoService = new VacinacoesService();
        try {
            const agenda = await vacinacaoService.listarHorariosOcupados();
            return res.json(agenda);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

export { VacinacoesController };