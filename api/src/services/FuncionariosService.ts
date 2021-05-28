import { getCustomRepository, Repository } from "typeorm"
import { Cidadao } from "../entities/Cidadao";
import { Funcionario } from "../entities/Funcionario";
import { CidadaosRepository } from "../repositories/CidadaosRepository";
import { FuncionariosRepository } from "../repositories/FuncionariosRepository"

interface ICriarFuncionario {
    cpf: string;
    cargo: string;
    local_trabalho: string;
}

class FuncionariosService {
    private funcionariosRepository: Repository<Funcionario>;
    private cidadaosRepository: Repository<Cidadao>;

    constructor() {
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
        this.cidadaosRepository = getCustomRepository(CidadaosRepository);
    }

    async cadastrarFuncionario ({cpf, cargo, local_trabalho} : ICriarFuncionario) {
        
        const cidadaoExiste = await this.cidadaosRepository.findOne({cpf})
        const funcionarioJaExiste = await this.funcionariosRepository.findOne({cpf})

        if (funcionarioJaExiste) {
            throw new Error("Cadastro de funcionário já realizado.");
        }

        if (!cidadaoExiste) {
            throw new Error("Cpf informado não equivale a nenhum cidadão cadastrado.");
        }

        const isPendente = true;
        const funcionario = this.funcionariosRepository.create({
            cpf, cargo, local_trabalho, isPendente
        });
        await this.funcionariosRepository.save(funcionario);
        return funcionario;
    }

    async listarFuncionariosPendentes() {
        const lista = await this.funcionariosRepository.find({isPendente: true})
        if (lista.length === 0) { return new Error("Não há cadastros de funcionários pendentes.")}
        return lista;
    }
}

export { FuncionariosService };