export interface ReservaDTO{
    id : string,
    checkIn? : string,
    checkOut? : string,
    numeroHospedes? : number,
    tipoIntermedio? : number,
    desconto? : number,
    total? : number,
    tipoLimpeza? : number,
    hospedagemId? : number,
    clienteId? : number
}