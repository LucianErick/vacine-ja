import { Cidadao } from "../entities/Cidadao";
import { EstadoVacinacao } from "./EstadoVacinacao";
import { Vacinado } from "./Vacinado";

class HabilitadoSegundaDose extends EstadoVacinacao {

    atualizaEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new Vacinado());
    }
    toString(): string {
        throw new Error("Cidadão habilitado para tomar a segunda dose.");
    }
}

export { HabilitadoSegundaDose };