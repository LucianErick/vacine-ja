import { getCustomRepository, Repository } from "typeorm"
import { Cidadao } from "../entities/Cidadao";
import { Funcionario } from "../entities/Funcionario";
import { Lote } from "../entities/LoteVacina";
import { Vacina } from "../entities/Vacina";
import { Vacinacao } from "../entities/Vacinacao";
import { CidadaosRepository } from "../repositories/CidadaosRepository";
import { FuncionariosRepository } from "../repositories/FuncionariosRepository"
import { LotesRepository } from "../repositories/LotesRepository";
import { VacinacoesRepository } from "../repositories/VacinacoesRepository";
import { VacinasRepository } from "../repositories/VacinasRepository";
import { diferencaDiasEntreDatas } from "../Util/util";

interface ICriarVacinacao {
    cidadao_id: string;
    funcionario_id: string;
    lote_id: string;
    numero_dose: number;
    data?: Date;
}

class VacinacoesService {

    private funcionariosRepository: Repository<Funcionario>;
    private cidadaosRepository: Repository<Cidadao>;
    private lotesRepository: Repository<Lote>;
    private vacinasRepository: Repository<Vacina>;
    private vacinacoesRepository: Repository<Vacinacao>

    constructor() {
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
        this.cidadaosRepository = getCustomRepository(CidadaosRepository);
        this.lotesRepository = getCustomRepository(LotesRepository);
        this.vacinasRepository = getCustomRepository(VacinasRepository);
        this.vacinacoesRepository = getCustomRepository(VacinacoesRepository);
    }

    async registrarVacinacao({ funcionario_id, cidadao_id, lote_id, numero_dose, data }: ICriarVacinacao) {
        const funcionario = await this.funcionariosRepository.findOne({
            where: {
                id: funcionario_id,
                isPendente: false
            }
        });
        if (!funcionario) { throw new Error("Funcionário não encontrado.")};

        const cidadao = await this.cidadaosRepository.findOne({
            where: {
                id: cidadao_id,
            }
        });
        if (!cidadao) { throw new Error("Cidadão não encontrado.")};

        const lote = await this.lotesRepository.findOne({
            where: {
                id: lote_id,
            }
        });
        if (!lote) { throw new Error("Lote não encontrado.")};

        const vacina = await this.vacinasRepository.findOne({
            where: {
                id: lote.vacina_id
            }
        })
        if (lote.quantidade < 1) { throw new Error("Número de unidades no lote é insuficiente.")};
        if (vacina.num_doses_necessarias < numero_dose) { throw new Error("Número da dose inválida.")};
        if (diferencaDiasEntreDatas(lote.data_validade, data) < 0) { throw new Error("O lote da vacina está vencido.")};

        const vacinacaoCadastrada = await this.vacinacoesRepository.create({funcionario_id, cidadao_id, data, lote_id, numero_dose})
        await this.vacinacoesRepository.save(vacinacaoCadastrada);
        return vacinacaoCadastrada;
    }
}

export { VacinacoesService };