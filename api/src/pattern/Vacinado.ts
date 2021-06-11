import { Cidadao } from "../entities/Cidadao";
import { EstadoVacinacao } from "./EstadoVacinacao";

class Vacinado extends EstadoVacinacao {

    atualizaEstado(cidadao: Cidadao): void {
    }
    
    toString(): string {
        throw new Error("Processo de vacinação concluído para o cidadão.");
    }
}

export { Vacinado };