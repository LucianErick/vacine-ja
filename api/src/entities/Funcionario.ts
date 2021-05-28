import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("funcionarios")
class Funcionario {
    
    @PrimaryColumn()
    id: string;
    
    @Column()
    cpf: string;

    @Column()
    cargo: string;

    @Column()
    local_trabalho: string;

    @Column()
    isPendente: boolean;

    @CreateDateColumn()
    criado_em: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Funcionario }