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

export function calcularIdade(nascimento: Date) {
    nascimento = new Date(nascimento);
    const hoje = new Date();
    let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < 
         new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
        diferencaAnos--;
    return diferencaAnos;
}