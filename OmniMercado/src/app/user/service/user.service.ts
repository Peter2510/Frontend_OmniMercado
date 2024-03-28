import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private loginService:LoginService) { }


  getUserProfile():Observable<any>{
    let user_id = this.loginService.getIdUser();

    return this.http.get<any>(`${baseURL}/perfil-usuario/${user_id}`);
  }

}
