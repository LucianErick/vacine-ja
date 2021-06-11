//Eu, como cidadão, gostaria de poder me cadastrar no sistema,
// informando meu nome completo, endereço, CPF, número do cartão do SUS, e-mail, 
//data de nascimento, telefone, profissão e comorbidades.

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { EstadoVacinacao } from "../pattern/EstadoVacinacao";
import { Inabilitado } from "../pattern/Inabilitado";
import { calcularIdade } from "../Util/util";
import { Vacina } from "./Vacina";

@Entity("cidadaos")
class Cidadao {

    @PrimaryColumn()
    id: string;

    @Column()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    num_cartao_sus: string;

    @Column()
    email: string;

    @Column()
    data_nascimento: Date;

    @Column()
    telefone: string;

    @Column()
    profissao: string;

    @Column()
    comorbidade: string;

    @CreateDateColumn()
    criado_em: Date;

    estadoVacinacao: EstadoVacinacao;

    vacinaAplicada: Vacina;

    idade: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.estadoVacinacao = new Inabilitado();
            this.vacinaAplicada = null;
            this.idade = calcularIdade(this.data_nascimento);
        }
    }

    atualizarEstado(): void {
        return this.estadoVacinacao.atualizaEstado(this);
    }

    mostrarEstadoAtual(): string {
        return this.estadoVacinacao.toString();
    }

    setEstado(novoEstado: EstadoVacinacao): void {
        this.estadoVacinacao = novoEstado;
    }
}

export { Cidadao };
