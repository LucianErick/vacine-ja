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
        if (!funcionario) { throw new Error("Funcion??rio n??o encontrado.") };

        const cidadao = await this.cidadaosRepository.findOne({
            where: {
                id: cidadao_id,
            }
        });

        if (!cidadao) { throw new Error("Cidad??o n??o encontrado.") };

        const horariosJaOcupados = this.listarHorariosOcupados();

        const ehHorarioDoCidadao = (await horariosJaOcupados).find(horario => {
            return ((horario.cidadao_id == cidadao_id) && (horario.horario.getTime() == data.getTime()));
        });
        if (!ehHorarioDoCidadao && numero_dose == 1) { throw new Error("Hor??rio de vacina????o inv??lido para o cidad??o informado.") };

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

        if (vacinacaoJaRealizada) { throw new Error("Cidad??o j?? tomou essa dose da vacina.") };

        if (!lote) { throw new Error("Lote n??o encontrado.") };

        const vacina = await this.vacinasRepository.findOne({
            where: {
                id: lote.vacina_id
            }
        })

        if (lote.quantidade < 1) { throw new Error("N??mero de unidades no lote ?? insuficiente.") };
        if (vacina.num_doses_necessarias < numero_dose) { throw new Error("N??mero da dose inv??lida.") };
        if (diferencaDiasEntreDatas(lote.data_validade, data) < 0) { throw new Error("O lote da vacina est?? vencido.") };

        let novoEstado = cidadao.estado_vacinacao;
        const primeiraDose = await this.vacinacoesRepository.findOne({ cidadao_id });
        const tempoHabilSegundaDose = !primeiraDose ? false : Math.abs(diferencaDiasEntreDatas(primeiraDose.data, data)) >= vacina.intervalo_entre_doses;


        if ((novoEstado === 2 && vacina.num_doses_necessarias === 1 && numero_dose === 1) ||
            novoEstado === 4 && vacina.num_doses_necessarias === 2 && numero_dose === 2) {
            novoEstado = 5;
        } else if (novoEstado === 2 && vacina.num_doses_necessarias === 2 && numero_dose === 1) {
            novoEstado = 3;
        } else if (novoEstado === 5) {
            throw new Error("Cidad??o j?? vacinado.");
        } else if (novoEstado === 3 && numero_dose === 2 && tempoHabilSegundaDose) {
            novoEstado = 5
        } else if (numero_dose === 2 && !tempoHabilSegundaDose) {
            console.log(`O Estado atual ??: ${novoEstado}, O n??mero de doses ?? ${vacina.num_doses_necessarias} e o n??mero da dose ??: ${numero_dose}`);
            throw new Error("Cidad??o ainda n??o habilitado para segunda dose.");
        } else {
            throw new Error("Erro ao registrar vacina????o.");
        }

        if (numero_dose === 2 && !cidadao.vacina_aplicada) {
            throw new Error("Primeira dose ainda n??o aplicada.");
        }

        await this.cidadaosRepository.update({ id: cidadao_id }, { estado_vacinacao: novoEstado, vacina_aplicada: vacina.id });

        const vacinacaoCadastrada = await this.vacinacoesRepository.create({ funcionario_id, cidadao_id, data, lote_id, numero_dose })
        await this.vacinacoesRepository.save(vacinacaoCadastrada);
        return vacinacaoCadastrada;
    }

    async agendarVacinacao({ cidadao_id, data }: IAgendarVacinacao) {
        data = new Date(data);
        const cidadao = await this.cidadaosRepository.findOne({
            where: {
                id: cidadao_id,
            }
        });
        if (!cidadao) { throw new Error("Cidad??o n??o encontrado.") };

        if (!(data.getHours() >= 2 && data.getHours() < 19)) { throw new Error("Hor??rio n??o dispon??vel para vacina????o.") };
        if (data.getMinutes() % 10 != 0 || data.getSeconds() != 0) { throw new Error("Hor??rio precisa ser exato.") };

        const horariosJaOcupados = this.listarHorariosOcupados();
        const horarioEstaOcupado = (await horariosJaOcupados).find(horario => (horario.horario.getTime() === data.getTime()));
        if (horarioEstaOcupado) { throw new Error("Hor??rio j?? ocupado.") };

        const estado = cidadao.estado_vacinacao;
        if (estado == 1) {
            throw new Error("Cidad??o ainda n??o habilitado.");
        } else if (estado == 5) {
            throw new Error("Processo de vacina????o conclu??do pelo cidad??o.");
        }

        const cidadaoJaAgendado = (await horariosJaOcupados).find(horario => horario.cidadao_id == cidadao_id);
        if (cidadaoJaAgendado) { throw new Error("Cidad??o j?? agendou hor??rio.") };

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