import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';


const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BarterService {

  private dataSubject = new BehaviorSubject<any>(null);

  data$ = this.dataSubject.asObservable();

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

  sendId(data: any) {
    this.dataSubject.next(data);
  }

  public setBarterProductToPending(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-publicacion-intercambio-a-pendiente/${id}`, null);
  }

  public setBarterProductToAvailable(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-publicacion-intercambio-a-disponible/${id}`, null);
  }

  public setBarterProductToRealized(id: number): Observable<any> {
      
      return this.http.patch<any>(`${baseURL}/cambiar-estado-publicacion-intercambio-a-vendido/${id}`, null);
  }

  public setBarterProductToRejected(id: number): Observable<any> {
      
    return this.http.patch<any>(`${baseURL}/cambiar-estado-publicacion-intercambio-a-rechazado/${id}`, null);

  }

  public setProductToDeleted(id: number): Observable<any> {
      
    return this.http.patch<any>(`${baseURL}/cambiar-estado-publicacion-intercambio-a-rechazado/${id}`, null);

  }

  public getBarterProductById(id: number): Observable<any> {
        
      return this.http.get<any>(`${baseURL}/publicacion-producto-trueque/${id}`);
  
    }

}
