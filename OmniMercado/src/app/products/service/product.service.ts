import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';


const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductService {
 
  constructor(private http: HttpClient,private loginService:LoginService) { }

  public getAvailableProducts(): Observable<any> {

    return this.http.get<any>(`${baseURL}/publicaciones-productos-activas`);
  }

  public getUserProducts(){
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/publicaciones-usuario/${user_id}`);
  }

  
  public getUserAvailableProducts(){
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/publicaciones-disponibles-para-usuario/${user_id}`);
  }

  public getProductsPendingApproval(){
    return this.http.get<any>(`${baseURL}/productos-pendientes-aprobacion`);
  }

  public getProductConditionTypes(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-condicion-productos`);
  }

  public getProductCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-productos`);
  }

  
}
