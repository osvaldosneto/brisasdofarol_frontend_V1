import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";;
import { Observable } from "rxjs/RX";
import { MsgDTO } from "../../models/msg.dto";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient) {
    }

    findById(id: string) {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findAll() : Observable<ClienteDTO[]> {
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/clientes`)
    }

    delete(id: string){
        return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
 
    deleteEmail(id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/deletemail/${id}`);
    }

    putCliente(obj : ClienteDTO, id : string){
        return this.http.put(
            `${API_CONFIG.baseUrl}/clientes/${id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    sendEmail(obj: MsgDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/sendemail`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    sendEmailAll(obj: MsgDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/sendallemail`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}