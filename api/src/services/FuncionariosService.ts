import { getCustomRepository, Repository } from "typeorm"
import { Funcionario } from "../entities/Funcionario";
import { FuncionariosRepository } from "../repositories/FuncionariosRepository"

interface ICriarFuncionario {
    cpf: string;
    cargo: string;
    localTrabalho: string;
}

class FuncionariosService {
    private funcionariosRepository: Repository<Funcionario>;

    constructor() {
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
    }

    async cadastrarFuncionario ({cpf, cargo, localTrabalho} : ICriarFuncionario) {
        const funcionario = this.funcionariosRepository.create({
            cpf, cargo, localTrabalho
        });
        await this.funcionariosRepository.save(funcionario);
    }
}

export { FuncionariosService };