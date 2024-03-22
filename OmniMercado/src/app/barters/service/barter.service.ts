import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';


const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BarterService {

  constructor(private http: HttpClient,private loginService:LoginService) { }

  public getAvailableBarterProducts(): Observable<any> {

    return this.http.get<any>(`${baseURL}/publicaciones-intercambio-productos-activas`);
  }

  public getUserBarterProducts(){
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/productos-intercambio-usuario/${user_id}`);
  }

  
  public getUserAvailableProducts(){
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/publicaciones-disponibles-para-usuario/${user_id}`);
  }

  public getBarderProductsPendingApproval(){
    return this.http.get<any>(`${baseURL}/productos-intercambio-pendientes-aprobacion`);
  }


}
