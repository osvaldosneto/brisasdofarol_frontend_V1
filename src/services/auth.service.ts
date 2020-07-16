import { Injectable } from "@angular/core"
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { text } from "@angular/core/src/render3/instructions";

@Injectable()
export class AuthService{

    constructor(public http : HttpClient){

    }

    authenticated(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe : 'response',
                responseType : 'text'
            });
    }

}