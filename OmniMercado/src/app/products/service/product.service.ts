import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { BehaviorSubject } from 'rxjs';


const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private dataSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private loginService: LoginService) { }

  data$ = this.dataSubject.asObservable();

  public getAvailableProducts(): Observable<any> {

    return this.http.get<any>(`${baseURL}/publicaciones-productos-activas`);
  }

  public getUserProducts() {
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/publicaciones-usuario/${user_id}`);
  }


  public getUserAvailableProducts() {
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/productos-disponibles-para-usuario/${user_id}`);
  }

  public getProductsPendingApproval() {
    return this.http.get<any>(`${baseURL}/productos-pendientes-aprobacion`);
  }

  public getProductConditionTypes(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-condicion-productos`);
  }

  public getProductCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-productos`);
  }

  public getProductById(id: number): Observable<any> {

    return this.http.get<any>(`${baseURL}/producto/${id}`);
  }

  sendId(data: any) {
    this.dataSubject.next(data);
  }

  public setProductToPending(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-producto-a-pendiente/${id}`, null);
  }

  public setProductToAvailable(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-producto-a-disponible/${id}`, null);
  }

  public setProductToSold(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-producto-a-vendido/${id}`, null);
  }

  public setProductToRejected(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-producto-a-rechazado/${id}`, null);
  }

  public getPriceProduct(id: number): Observable<any> {

    return this.http.get<any>(`${baseURL}/precio-producto/${id}`);
  }

  public getStateProduct(id: number): Observable<any> {

    return this.http.get<any>(`${baseURL}/estado-producto/${id}`);
  }

  public createSale(id: any): Observable<any> {
    const formData = new FormData();
    let user_id = this.loginService.getIdUser();
    formData.append("user_id", user_id);
    formData.append("product_id", id);
    return this.http.post<any>(`${baseURL}/crear-venta`, formData);
  }

  public getUserPurchaseProducts(): Observable<any> {
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/obtener-compras-usuario/${user_id}`);
  }

}
