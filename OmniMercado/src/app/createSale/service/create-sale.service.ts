import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateSaleService {

  
  constructor(private http: HttpClient) { }

  public signupStatusSubject = new Subject<boolean>;

  public getProductConditionTypes(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-condicion-productos`);
  }
  
  public getProductCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-productos`);
  }

  

}
