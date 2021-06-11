import { getCustomRepository, Repository } from "typeorm"
import { Agenda } from "../entities/Agenda";
import { Cidadao } from "../entities/Cidadao";
import { Funcionario } from "../entities/Funcionario";
import { Lote } from "../entities/LoteVacina";
import { Vacina } from "../entities/Vacina";
import { Vacinacao } from "../entities/Vacinacao";
import { AgendaRepository } from "../repositories/AgendaRepository";
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

interface IAgendarVacinacao {
    cidadao_id: string;
    data: Date;
}

class VacinacoesService {

    private funcionariosRepository: Repository<Funcionario>;
    private cidadaosRepository: Repository<Cidadao>;
    private lotesRepository: Repository<Lote>;
    private vacinasRepository: Repository<Vacina>;
    private vacinacoesRepository: Repository<Vacinacao>
    private agendaRepository: Repository<Agenda>;

    constructor() {
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
        this.cidadaosRepository = getCustomRepository(CidadaosRepository);
        this.lotesRepository = getCustomRepository(LotesRepository);
        this.vacinasRepository = getCustomRepository(VacinasRepository);
        this.vacinacoesRepository = getCustomRepository(VacinacoesRepository);
        this.agendaRepository = getCustomRepository(AgendaRepository);
    }

    async registrarVacinacao({ funcionario_id, cidadao_id, lote_id, numero_dose, data }: ICriarVacinacao) {
        data = new Date(data);
        const funcionario = await this.funcionariosRepository.findOne({
            where: {
                id: funcionario_id,
                isPendente: false
            }
        });
        if (!funcionario) { throw new Error("Funcionário não encontrado.") };

        const cidadao = await this.cidadaosRepository.findOne({
            where: {
                id: cidadao_id,
            }
        });
        if (!cidadao) { throw new Error("Cidadão não encontrado.") };

        const horariosJaOcupados = this.listarHorariosOcupados();

        const ehHorarioDoCidadao = (await horariosJaOcupados).find( horario => {
            return (horario.horario.getTime() === data.getTime());
        });
        if (!ehHorarioDoCidadao) { throw new Error("Horário de vacinação inválido para o cidadão informado.")};

        const lote = await this.lotesRepository.findOne({
            where: {
                id: lote_id,
            }
        });

        const vacinacaoJaRealizada = await this.vacinacoesRepository.findOne({
            where: {
                cidadao_id,
                numero_dose,
            }
        })

        if (vacinacaoJaRealizada) { throw new Error("Cidadão já tomou essa dose da vacina.")};

        if (!lote) { throw new Error("Lote não encontrado.") };

        const vacina = await this.vacinasRepository.findOne({
            where: {
                id: lote.vacina_id
            }
        })
        if (lote.quantidade < 1) { throw new Error("Número de unidades no lote é insuficiente.") };
        if (vacina.num_doses_necessarias < numero_dose) { throw new Error("Número da dose inválida.") };
        if (diferencaDiasEntreDatas(lote.data_validade, data) < 0) { throw new Error("O lote da vacina está vencido.") };

        const vacinacaoCadastrada = await this.vacinacoesRepository.create({ funcionario_id, cidadao_id, data, lote_id, numero_dose })
        await this.vacinacoesRepository.save(vacinacaoCadastrada);
        return vacinacaoCadastrada;
    }

    async agendarVacinacao({ cidadao_id, data }: IAgendarVacinacao) {
        data = new Date(data);

        if (!(data.getHours() >= 2 && data.getHours() < 19)) { throw new Error("Horário não disponível para vacinação.") };
        if (data.getMinutes() % 10 != 0 || data.getSeconds() != 0) { throw new Error("Horário precisa ser exato.") };
        
        const horariosJaOcupados = this.listarHorariosOcupados();

        const cidadaoJaAgendado = (await horariosJaOcupados).find(horario => horario.cidadao_id == cidadao_id);
        if (cidadaoJaAgendado) { throw new Error("Cidadão já agendou horário.")};

        const horarioEstaOcupado = (await horariosJaOcupados).find( horario => (horario.horario === data));
        if (horarioEstaOcupado) { throw new Error("Horário já ocupado.")};

        const cidadao = await this.cidadaosRepository.findOne({
            where: {
                id: cidadao_id,
            }
        });
        if (!cidadao) { throw new Error("Cidadão não encontrado.") };

        const agendamento = await this.agendaRepository.create({ cidadao_id, data });
        await this.agendaRepository.save(agendamento);
        return agendamento;
    }

    async listarHorariosOcupados() {
        let horariosJaOcupados = []
        const horariosJaCadastrados = await this.agendaRepository.find();
        
        horariosJaCadastrados.forEach((horario) => {
            horariosJaOcupados.push({
                cidadao_id: horario.cidadao_id,
                horario: horario.data
            })
        })
        return horariosJaOcupados;
    }
}

export { VacinacoesService };