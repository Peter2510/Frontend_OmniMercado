import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductService {
 
  constructor(private http: HttpClient) { }

  public getAvailableProducts(): Observable<any> {

    return this.http.get<any>(`${baseURL}/publicaciones-productos-activas`);
  }

  
  
}
