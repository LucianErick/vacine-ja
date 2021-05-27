//Eu, como cidadão, gostaria de poder me cadastrar no sistema,
// informando meu nome completo, endereço, CPF, número do cartão do SUS, e-mail, 
//data de nascimento, telefone, profissão e comorbidades.

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";

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
    data_nascimento: string;

    @Column()
    telefone: string;

    @Column()
    profissao: string;

    @Column()
    comorbidade: string;

    @CreateDateColumn()
    criado_em: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export {Cidadao}