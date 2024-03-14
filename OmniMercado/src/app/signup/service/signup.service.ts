import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public signupStatusSubject = new Subject<boolean>;

  public getGenders(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-generos`);
  }

  public validateEmail(data: any): Observable<any> {

    return this.http.post<any>(`${baseURL}/validar-correo`, data);
  }

  public createUser(data: any, photo?: any): Observable<any> {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    formData.append('photo', photo);

    return this.http.post<any>(`${baseURL}/crear-usuario`, formData);

  }


}
