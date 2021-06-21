//Eu, como cidadão, gostaria de poder me cadastrar no sistema,
// informando meu nome completo, endereço, CPF, número do cartão do SUS, e-mail, 
//data de nascimento, telefone, profissão e comorbidades.

import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { EsperandoSegundaDose, EstadoVacinacao, HabilitadoPrimeiraDose, HabilitadoSegundaDose, Inabilitado } from "../pattern/EstadoVacinacao";
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

    @Column()
    estado_vacinacao: number;

    estado: EstadoVacinacao;

    @JoinColumn({name: "vacina_aplicada"})
    @OneToOne(() => Vacina)
    vacina: Vacina;

    @Column()
    vacina_aplicada: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
        this.estado = new Inabilitado();
        this.iniciarEstado(this.estado);
    }

    iniciarEstado(estado: EstadoVacinacao): void {
        if (estado instanceof Inabilitado) {
            this.estado_vacinacao = 1;
        } else if (estado instanceof HabilitadoPrimeiraDose) {
            this.estado_vacinacao = 2;
        } else if (estado instanceof EsperandoSegundaDose) {
            this.estado_vacinacao = 3
        } else if (estado instanceof HabilitadoSegundaDose) {
            this.estado_vacinacao = 4
        } else {
            this.estado_vacinacao = 5;
        }
    }

    setEstado(estado: EstadoVacinacao): void {
        this.estado = estado;
        this.iniciarEstado(estado);
    }

    mostrarEstado(): string {
        let retorno = "";
        switch (this.estado_vacinacao) {
            case 1:
                retorno = "INABILITADO temporariamente.";
                break;
            case 2:
                retorno = "HABILITADO PARA PRIMEIRA DOSE.";
                break;
            case 3:
                retorno = "ESPERANDO SEGUNDA DOSE.";
                break;
            case 4:
                retorno = "HABILITADO PARA SEGUNDA DOSE.";
                break;
            case 5:
                retorno = "VACINADO.";
                break;
        }
        return retorno;
    }

    atualizarEstado(): void {
        return this.estado.atualizarEstado(this);
    }

    incrementarEstado(): void {
        if (this.estado_vacinacao < 5) {
            this.estado_vacinacao += 1;
        }
    }
}

export { Cidadao };
