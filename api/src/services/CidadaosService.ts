import { getCustomRepository, Repository } from "typeorm"
import { Cidadao } from "../entities/Cidadao";
import { CidadaosRepository } from "../repositories/CidadaosRepository";

interface ICriarUsuario {
    cpf: string;
    nome: string;
    endereco: string;
    num_cartao_sus: string;
    email: string;
    data_nascimento: string;
    telefone: string;
    profissao: string;
    comorbidade: string;
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

        const cidadao = this.cidadaosRepository.create({
            cpf, nome, endereco,
            num_cartao_sus, email, data_nascimento,
            telefone, profissao, comorbidade
        });
        await this.cidadaosRepository.save(cidadao);
        return cidadao;
    }
}

export { CidadaosService };
