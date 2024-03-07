import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  public signupStatusSubject = new Subject<boolean>;

  public validateEmail(data: any): Observable<any> {
    
    return this.http.post<any>(`${baseURL}/validar-correo`, {correo:data});
  }

  public crearUsuario(data: any): Observable<any> {
    
    return this.http.post<any>(`${baseURL}/crear-usuario`, data);
  }
  

    
}
