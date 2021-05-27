import { getCustomRepository, Repository } from "typeorm"
import { Administrador } from "../entities/Admin";
import { AdministradoresRepository } from "../repositories/AdministradoresRepository"

interface ICriarAdmin {
    cpf: string;
}

class AdministradoresService {
    private administradoresRepository: Repository<Administrador>;

    constructor() {
        this.administradoresRepository = getCustomRepository(AdministradoresRepository);
    }

    async cadastrarFuncionario ({ cpf } : ICriarAdmin) {
        const admin = this.administradoresRepository.create({
            cpf
        });
        await this.administradoresRepository.save(admin);
    }
}

export { AdministradoresService };