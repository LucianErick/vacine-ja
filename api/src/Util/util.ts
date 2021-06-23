export function diferencaDias(data: Date) {
    const agora = new Date(); // Data de hoje
    const tempoFuturo = new Date(data); // Outra data no futuro
    const diferenca = tempoFuturo.getTime() - agora.getTime(); // Subtrai uma data pela outra
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    return dias;
}

export function diferencaDiasEntreDatas(dataFutura: Date, dataPassada: Date) {
    const futura = new Date(dataFutura);
    const passada = new Date(dataPassada);
    const diferenca = futura.getTime() - passada.getTime(); // Subtrai uma data pela outra
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    return dias;
}

export function calcularIdade(dataNascimento: Date) {
    dataNascimento = new Date(dataNascimento);
    let agora = new Date();
    let diferenca = agora.getTime() - dataNascimento.getTime();
    return Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
}