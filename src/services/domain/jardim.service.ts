import { jardimDto } from './../../models/jardim.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class JardimService{

    constructor(public http : HttpClient){
    }

    find(){
        return this.http.get<jardimDto>(`${API_CONFIG.baseUrl}/jardim`)
    }

    insert(obj : jardimDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/jardim`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}