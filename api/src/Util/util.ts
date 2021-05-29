export function diferencaDias(data: Date) {
    const agora = new Date(); // Data de hoje
    const tempoFuturo = new Date(data); // Outra data no passado
    const diferenca = Math.abs(tempoFuturo.getTime() - agora.getTime()); // Subtrai uma data pela outra
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    return dias;
}