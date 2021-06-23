import { getCustomRepository, Repository } from "typeorm"
import { Cidadao } from "../entities/Cidadao";
import { CidadaosRepository } from "../repositories/CidadaosRepository";
import { calcularIdade } from "../Util/util";
import {getConnection} from 'typeorm';

interface ICriarUsuario {
    cpf: string;
    nome: string;
    endereco: string;
    num_cartao_sus: string;
    email: string;
    data_nascimento: Date;
    telefone: string;
    profissao?: string;
    comorbidade?: string;
    vacina_id?: string;
}

class CidadaosService {
    private cidadaosRepository: Repository<Cidadao>;

    constructor() {
        this.cidadaosRepository = getCustomRepository(CidadaosRepository);
    }

    async cadastrarCidadao({ cpf, nome, endereco, num_cartao_sus, email, data_nascimento, telefone, profissao, comorbidade }: ICriarUsuario) {
        const cidadaoJaExiste = await this.cidadaosRepository.findOne({
            cpf
        })

        if (cidadaoJaExiste) {
            throw new Error("Cidadão já cadastrado.");
        }

        profissao = !profissao ? profissao : profissao.toUpperCase();
        comorbidade = !comorbidade ? comorbidade : comorbidade.toUpperCase();

        const idade = calcularIdade(data_nascimento);
        const cidadao = this.cidadaosRepository.create({
            cpf, nome, endereco,
            num_cartao_sus, email, data_nascimento,
            telefone, profissao, comorbidade, idade
        });

        await this.cidadaosRepository.save(cidadao);
        return cidadao;
    }

    async alterarDados(cpf: string, atributo: string, novoParametro: string) {
        const cidadao = await this.cidadaosRepository.findOne({ cpf });
        if (!cidadao) { throw new Error("Cidadão não encontrado.") };
        switch (atributo.toUpperCase()) {
            case 'NOME':
                cidadao.nome = novoParametro;
                break;
            case 'ENDERECO':
                cidadao.endereco = novoParametro;
                break;
            case 'EMAIL':
                cidadao.email = novoParametro;
                break;
            case 'TELEFONE':
                cidadao.telefone = novoParametro;
                break;
            default:
                throw new Error("Parâmetro inválido.");
        }
        await this.cidadaosRepository.save(cidadao);
        console.log(cidadao);
    }

    async listarInformacoesCidadao(cpf: string) {
        const cidadao = await this.cidadaosRepository.findOne({ cpf });
        if (!cidadao) {
            throw new Error("Cpf inserido não corresponde a nenhum cidadão cadastrado.");
        }
        return cidadao;
    }

    async consultarEstagioVacinacao(cpf: string) {
        const cidadao = await this.cidadaosRepository.findOne({ cpf });
        if (!cidadao) {
            throw new Error("Cpf inserido não corresponde a nenhum cidadão cadastrado.");
        }

        return cidadao.mostrarEstado();
    }
}

export { CidadaosService };
