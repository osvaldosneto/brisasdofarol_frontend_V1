import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/RX";
import { ReservaDTO } from "../../models/reserva.dto";

@Injectable()
export class ReservaService{
    constructor(public http : HttpClient){

    }

    findAll() : Observable<ReservaDTO[]> {
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

}