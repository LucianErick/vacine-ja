import { getCustomRepository, MoreThanOrEqual, Repository } from "typeorm"
import { Cidadao } from "../entities/Cidadao";
import { Funcionario } from "../entities/Funcionario";
import { Lote } from "../entities/LoteVacina";
import { Vacina } from "../entities/Vacina";
import { CidadaosRepository } from "../repositories/CidadaosRepository";
import { FuncionariosRepository } from "../repositories/FuncionariosRepository"
import { LotesRepository } from "../repositories/LotesRepository";
import { VacinasRepository } from "../repositories/VacinasRepository";
import { diferencaDias } from "../Util/util";

interface ICriarFuncionario {
    cpf: string;
    cargo: string;
    local_trabalho: string;
}

interface ICriarLote {
    vacina_id: string;
    quantidade: number;
    tipo_vacina: number;
    data_validade: Date;
}

interface IHabilitarCidadao {
    lote_id: string,
    parametro: string
}

class FuncionariosService {
    private funcionariosRepository: Repository<Funcionario>;
    private cidadaosRepository: Repository<Cidadao>;
    private lotesRepository: Repository<Lote>;
    private vacinasRepository: Repository<Vacina>;

    constructor() {
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
        this.cidadaosRepository = getCustomRepository(CidadaosRepository);
        this.lotesRepository = getCustomRepository(LotesRepository);
        this.vacinasRepository = getCustomRepository(VacinasRepository);
    }

    async cadastrarFuncionario({ cpf, cargo, local_trabalho }: ICriarFuncionario) {

        const cidadaoExiste = await this.cidadaosRepository.findOne({ cpf })
        const funcionarioJaExiste = await this.funcionariosRepository.findOne({ cpf })

        if (funcionarioJaExiste) {
            throw new Error("Cadastro de funcionário já realizado.");
        }

        if (!cidadaoExiste) {
            throw new Error("Cpf informado não equivale a nenhum cidadão cadastrado.");
        }

        const isPendente = true; // ao se cadastrar, a aprovacao esta pendente.
        const funcionario = this.funcionariosRepository.create({
            cpf, cargo, local_trabalho, isPendente
        });
        await this.funcionariosRepository.save(funcionario);
        return funcionario;
    }

    async listarFuncionariosPendentes() {
        const lista = await this.funcionariosRepository.find({ isPendente: true })
        if (lista.length === 0) { return new Error("Não há cadastros de funcionários pendentes.") }
        return lista;
    }

    async cadastrarLote({ vacina_id, quantidade, tipo_vacina, data_validade }: ICriarLote) {
        const tipoVacinaEhValida = tipo_vacina == 1 || tipo_vacina == 2 || tipo_vacina == 3;
        if (!tipoVacinaEhValida) { throw new Error("Tipo de Vacina inválida.") }

        const vacinaExiste = await this.vacinasRepository.find({
            where: [
                { id: vacina_id }
            ]
        })
        if (!vacinaExiste) { throw new Error("Vacina não existe.") }
        if (quantidade < 1) { throw new Error("Número de doses disponíveis inválida.") }

        if (diferencaDias(data_validade) <= 0 || diferencaDias(data_validade) > 1825) { throw new Error("Data de validade inválida.") }

        const lote = this.lotesRepository.create({ vacina_id, quantidade, tipo_vacina, data_validade });
        await this.lotesRepository.save(lote)
        return lote;
    }

    async listarDoses() {
        const listaLotes = await this.lotesRepository.find();
        if (!listaLotes) { throw new Error("Sem lotes cadastrados.") }
        return listaLotes;
    }

    async habilitarCidadao({ lote_id, parametro }: IHabilitarCidadao) {
        parametro = parametro.toUpperCase();
        const lote = await this.lotesRepository.findOne({ where: { id: lote_id } })
        if (!lote) { throw new Error("Lote de vacina não encontrado.") };

        let listaPorParametro;

        switch (lote.tipo_vacina) {
            case 1:
                listaPorParametro = await this.cidadaosRepository.find({
                    where: {
                        idade: MoreThanOrEqual(parametro)
                    }
                });
                break;
            case 2:
                listaPorParametro = await this.cidadaosRepository.find({
                    where: {
                        profissao: parametro
                    }
                })
                break;
            case 3:
                listaPorParametro = await this.cidadaosRepository.find({
                    where: {
                        comorbidade: parametro
                    }
                })
                break;
            default:
                throw new Error("Opção inválida.");
        }
        listaPorParametro.forEach(cidadao => {
            if (cidadao.estado_vacinacao == 1) {
                cidadao.estado_vacinacao += 1;
            }
            this.cidadaosRepository.update({ id: `${cidadao.id}` }, { estado_vacinacao: cidadao.estado_vacinacao });
        });
    };
}

export { FuncionariosService };