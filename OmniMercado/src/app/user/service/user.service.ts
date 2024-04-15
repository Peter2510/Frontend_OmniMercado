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

  public updateUser(state:any): Observable<any> {
    let user_id = this.loginService.getIdUser();
    const formData = new FormData();
    formData.append('state', state);
    return this.http.post<any>(`${baseURL}/actualizar-perfil-usuario/${user_id}`, formData);
  }

  public rechargeCoins(money:number): Observable<any> {
    let user_id = this.loginService.getIdUser();
    const formData = new FormData();
    formData.append('money', money.toString());
    formData.append('user_id',user_id);
    return this.http.post<any>(`${baseURL}/recargar-monedas`, formData);
  }

  public getBadge(){
    return this.http.get<any>(`${baseURL}/obtener-divisa`);
  }

}
