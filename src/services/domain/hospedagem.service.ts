import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { HospedagemDto } from "../../models/hospedagem.dto";
import { Observable } from "rxjs/RX";

@Injectable()
export class HospedagemService{
    constructor(public http : HttpClient){

    }

    findAll() : Observable<HospedagemDto[]> {
        return this.http.get<HospedagemDto[]>(`${API_CONFIG.baseUrl}/hospedagens`)
    }

    findById(id: string) {
        return this.http.get<HospedagemDto>(`${API_CONFIG.baseUrl}/hospedagens/${id}`);
    }

    removeHospedagem(id : string){
        return this.http.delete(`${API_CONFIG.baseUrl}/hospedagens/${id}`);
    }

    insert(obj : HospedagemDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/hospedagens`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}