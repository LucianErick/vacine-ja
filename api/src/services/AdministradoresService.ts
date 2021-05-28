import { getCustomRepository, Repository } from "typeorm"
import { Administrador } from "../entities/Admin";
import { Funcionario } from "../entities/Funcionario";
import { AdministradoresRepository } from "../repositories/AdministradoresRepository"
import { FuncionariosRepository } from "../repositories/FuncionariosRepository";

interface ICriarAdmin {
    cpf: string;
}

interface IAprovarCadastroFuncionario {
    cpf: string;
    aprovado: boolean;
}

class AdministradoresService {
    private administradoresRepository: Repository<Administrador>;
    private funcionariosRepository: Repository<Funcionario>;
    constructor() {
        this.administradoresRepository = getCustomRepository(AdministradoresRepository);
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
    }

    async cadastrarAdmin({ cpf }: ICriarAdmin) {
        const admin = await this.administradoresRepository.create({ cpf });
        await this.administradoresRepository.save(admin);
    }

    async aprovarCadastroFuncionario({ cpf, aprovado }: IAprovarCadastroFuncionario) {
        const funcionario = await this.funcionariosRepository.findOne({ cpf });
        if (!funcionario) { throw new Error("Cpf não encontrado.") }
        if (!funcionario.isPendente) {throw new Error("Funcionário já cadastrado.")}
        if (!aprovado) {
            await this.funcionariosRepository.delete({ cpf });
        } else {
            await this.funcionariosRepository.update({ cpf }, { isPendente: false });
        }
    }

    async listarFuncionarios() {
        const lista = await this.funcionariosRepository.find({isPendente: false});
        if (lista.length === 0) { return new Error("Não há cadastros de funcionários pendentes.")}
        return lista;
    }
}

export { AdministradoresService };