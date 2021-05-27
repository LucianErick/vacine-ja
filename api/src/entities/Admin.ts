import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("administradores")
class Administrador {
    
    @PrimaryColumn()
    id: string;
    
    @Column()
    cpf: string;

    @CreateDateColumn()
    criado_em: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export {Administrador}