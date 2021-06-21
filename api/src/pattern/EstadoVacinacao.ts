import { Cidadao } from "../entities/Cidadao";

interface EstadoVacinacao {
    mostrarEstado(): string;
    atualizarEstado(cidadao: Cidadao): void;
}

class Inabilitado implements EstadoVacinacao {
    mostrarEstado(): string {
        return "cidadão INABILITADO para tomar a vacina no momento.";
    }
    atualizarEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new HabilitadoPrimeiraDose());
    }
}

class HabilitadoPrimeiraDose implements EstadoVacinacao {
    mostrarEstado(): string {
        return "cidadão HABILITADO para PRIMEIRA DOSE.";
    }
    atualizarEstado(cidadao: Cidadao): void {
        if (cidadao.vacina.num_doses_necessarias === 2) {
            cidadao.setEstado(new EsperandoSegundaDose());
        } else {
            cidadao.setEstado(new Vacinado());
        }
    }
}

class EsperandoSegundaDose implements EstadoVacinacao {
    mostrarEstado(): string {
        return "cidadão ESPERANDO SEGUNDA DOSE.";
    }
    atualizarEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new HabilitadoSegundaDose());
    }
}

class HabilitadoSegundaDose implements EstadoVacinacao {
    mostrarEstado(): string {
        return "cidadão HABILITADO para SEGUNDA DOSE.";
    }
    atualizarEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new Vacinado());
    }
}

class Vacinado implements EstadoVacinacao {
    mostrarEstado(): string {
        return "cidadão VACINADO. VIVA O SUS!";
    }
    atualizarEstado(cidadao: Cidadao): void {
        console.log("Vacinado.")
    }
}
export {EstadoVacinacao, Inabilitado, HabilitadoPrimeiraDose, EsperandoSegundaDose, HabilitadoSegundaDose, Vacinado};