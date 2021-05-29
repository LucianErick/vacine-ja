import { getCustomRepository, Repository } from "typeorm"
import { Administrador } from "../entities/Admin";
import { Fabricante } from "../entities/Fabricante";
import { Funcionario } from "../entities/Funcionario";
import { Vacina } from "../entities/Vacina";
import { AdministradoresRepository } from "../repositories/AdministradoresRepository"
import { FabricantesRepository } from "../repositories/FabricantesRepository";
import { FuncionariosRepository } from "../repositories/FuncionariosRepository";
import { VacinasRepository } from "../repositories/VacinasRepository";

interface ICriarAdmin {
    cpf: string;
}

interface IAprovarCadastroFuncionario {
    cpf: string;
    aprovado: boolean;
}

interface ICriarFabricante {
    nome: string,
    pais: string,
}

interface ICriarVacina {
    nome: string,
    fabricante_id: string,
    num_doses_necessarias: number,
    intervalo_entre_doses: number,
}

class AdministradoresService {
    private administradoresRepository: Repository<Administrador>;
    private funcionariosRepository: Repository<Funcionario>;
    private fabricantesRepository: Repository<Fabricante>;
    private vacinasRepository: Repository<Vacina>;

    constructor() {
        this.administradoresRepository = getCustomRepository(AdministradoresRepository);
        this.funcionariosRepository = getCustomRepository(FuncionariosRepository);
        this.fabricantesRepository = getCustomRepository(FabricantesRepository);
        this.vacinasRepository = getCustomRepository(VacinasRepository);
    }

    async cadastrarAdmin({ cpf }: ICriarAdmin) {
        const admin = await this.administradoresRepository.create({ cpf });
        await this.administradoresRepository.save(admin);
    }

    async aprovarCadastroFuncionario({ cpf, aprovado }: IAprovarCadastroFuncionario) {
        const funcionario = await this.funcionariosRepository.findOne({ cpf });
        if (!funcionario) { throw new Error("Cpf não encontrado.") }
        if (!funcionario.isPendente) { throw new Error("Funcionário já cadastrado.") }
        if (!aprovado) {
            await this.funcionariosRepository.delete({ cpf });
        } else {
            await this.funcionariosRepository.update({ cpf }, { isPendente: false });
        }
    }

    async listarFuncionarios() {
        const lista = await this.funcionariosRepository.find({ isPendente: false });
        if (lista.length === 0) { return new Error("Não há cadastros de funcionários pendentes.") }
        return lista;
    }

    async cadastrarFabricante({ nome, pais }: ICriarFabricante) {
        const fabricanteJaExiste = await this.fabricantesRepository.findOne({ nome, pais });
        if (fabricanteJaExiste) { throw new Error("Fabricante já cadastrado."); }
        const fabricante = await this.fabricantesRepository.create({ nome, pais });
        await this.fabricantesRepository.save(fabricante);
        return fabricante;
    }

    async listarFabricantes() {
        const lista = await this.fabricantesRepository.find();
        if (lista.length === 0) { return new Error("Não há fabricantes cadastrados.") }
        return lista;
    }

    async cadastrarVacina({ nome, fabricante_id, num_doses_necessarias, intervalo_entre_doses }: ICriarVacina) {
        const fabricanteExiste = await this.fabricantesRepository.findOne({
            where: [
                { id: fabricante_id }
            ]
        })
        if (!fabricanteExiste) { throw new Error("Fabricante não existe.")}
        if (num_doses_necessarias > 2 || num_doses_necessarias < 1) { throw new Error("Número de doses inválidas.")}
        if (intervalo_entre_doses > 100) { throw new Error("Intervalo entre doses muito grande.")}

        const vacina = this.vacinasRepository.create({nome, fabricante_id, num_doses_necessarias, intervalo_entre_doses});
        await this.vacinasRepository.save(vacina)
        return vacina;
    }

    async listarTiposDeVacina() {
        const lista = [
            {
                tipo: 1,
                descricao: "Idade Mínima"
            },
            {
                tipo: 2,
                descricao: "Profissao"
            },
            {
                tipo: 3,
                descricao: "Comorbidade"
            },
        ];
        return lista;
    }

    async listarVacinas() {
        const lista = await this.vacinasRepository.find();
        if (lista.length === 0) { return new Error("Não há vacinas cadastradas.") }
        return lista;
    }
}

export { AdministradoresService };