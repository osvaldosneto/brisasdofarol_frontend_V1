import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ReservaDTO } from "../../models/reserva.dto";

@Injectable()
export class ReservaService{
    constructor(public http : HttpClient){

    }

    findAll(){
        return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/reservas`)
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/reservas/${id}`);
    }

    insert(obj : ReservaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/reservas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    findByData(obj: any){
        if(obj.data == null){
            return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/reservas/all`)
        } else {
            return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/reservas/filtrodata?data=${obj.data}`);
        }
    }

    findByNomeData(obj : any){        
        if(obj.idCliente == "*Todos"){
            obj.idCliente = ""
        }
        if(obj.idHospedagem == "*Todos"){
            obj.idHospedagem = ""
        }
        return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/reservas/filtrohospedagem?idHospedagem=${obj.idHospedagem}&idCliente=${obj.idCliente}`);
    }

    findByNome(id: string){
        return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/reservas/filtrohospedagem?idHospedagem=&idCliente=${id}`);
    }

    delete(id : string){
        return this.http.delete(`${API_CONFIG.baseUrl}/reservas/${id}`);
    }

}