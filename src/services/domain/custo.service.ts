import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CustoDTO } from "../../models/custo.dto";

@Injectable()
export class CustoService {

    constructor(
        public http: HttpClient) {
    }

    putCusto(obj : CustoDTO, id : string){
        console.log(id)
        return this.http.put(
            `${API_CONFIG.baseUrl}/custos/${id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/custos/${id}`);
    }
    
    findAll(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/custos`);
    }

    delete(id : string){
        return this.http.delete(`${API_CONFIG.baseUrl}/custos/${id}`);
    }

    insert(obj : CustoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/custos`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    findByNomeData(obj : any){
        if(obj.datainicio == null){
            obj.datainicio = ""
        }
        if(obj.datafim == null){
            obj.datafim = ""
        }
        if(obj.nome == "*Todos"){
            obj.nome = ""
        }
        return this.http.get<CustoDTO[]>(`${API_CONFIG.baseUrl}/custos/filtro?dia1=${obj.datainicio}&dia2=${obj.datafim}&nome=${obj.nome}`);
    }

}