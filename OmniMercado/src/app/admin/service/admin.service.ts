import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,private loginService:LoginService) { }

  public getRoles(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-roles-administrativo`);
  }

  public createAdmin(data: any): Observable<any> {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.post<any>(`${baseURL}/crear-admin`, formData);

  }

  getAdminProfile():Observable<any>{
    
    let user_id = this.loginService.getIdAdmin();

    return this.http.get<any>(`${baseURL}/perfil-admin/${user_id}`);
  }

  getCountPostPendingApproval():Observable<any>{
    
    return this.http.get<any>(`${baseURL}/cantidad-publicaciones-pendientes-aprobacion`);
    
  }

}
