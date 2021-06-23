//Eu, como cidadão, gostaria de poder me cadastrar no sistema,
// informando meu nome completo, endereço, CPF, número do cartão do SUS, e-mail, 
//data de nascimento, telefone, profissão e comorbidades.

import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { EsperandoSegundaDose, EstadoVacinacao, HabilitadoPrimeiraDose, HabilitadoSegundaDose, Inabilitado } from "../pattern/EstadoVacinacao";
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

    @Column()
    estado_vacinacao: number;

    @Column()
    idade: number;

    @JoinColumn({name: "vacina_aplicada"})
    @OneToOne(() => Vacina)
    vacina: Vacina;

    @Column()
    vacina_aplicada: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
        this.estado_vacinacao = 1;
        this.idade = calcularIdade(this.data_nascimento);
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

    incrementarEstado(): void {
        if (this.estado_vacinacao < 5) {
            this.estado_vacinacao += 1;
        }
    }
}

export { Cidadao };
