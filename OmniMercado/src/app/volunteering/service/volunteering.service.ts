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
export class VolunteeringService {

  private dataSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,private loginService:LoginService) { }

  data$ = this.dataSubject.asObservable();

  public getVolunteeringCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-voluntariados`);
  }
  
  public createVolunteering(volunteeringData: any, photos: any,categories:any): Observable<any> {

    const formData = new FormData();

    for (const key in volunteeringData) {
      if (volunteeringData.hasOwnProperty(key)) {
        formData.append(key, volunteeringData[key]);
      }
    }

    for (let i = 0; i < photos.length; i++) {
      const file: File = photos[i];
      formData.append('photo[]', file);
    }
    
    formData.append('id_user', this.loginService.getIdUser());
    
    for (let i = 0; i < categories.length; i++) {
      formData.append('id_categories[]', categories[i].id_tipo_categoria);
    }
    
    return this.http.post<any>(`${baseURL}/crear-voluntariado`, formData);

  }

  public getAvailableVolunteerings(): Observable<any> {

    return this.http.get<any>(`${baseURL}/voluntariados-activos`);
  }

  public getVolunteeringPendingApproval(){
    return this.http.get<any>(`${baseURL}/voluntariados-pendientes-aprobacion`);
  }

  public getVolunteeringById(id: number): Observable<any> {
    return this.http.get<any>(`${baseURL}/voluntariado/${id}`);
  }

  sendId(data: any) {
    this.dataSubject.next(data);
  }

  public setVolunteeringToPending(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-voluntariado-a-pendiente/${id}`, null);
  }

  public setVolunteeringToAvailable(id: number): Observable<any> {

    return this.http.patch<any>(`${baseURL}/cambiar-estado-voluntariado-a-disponible/${id}`, null);
  }

  public setVolunteeringToRealized(id: number): Observable<any> {
      
      return this.http.patch<any>(`${baseURL}/cambiar-estado-voluntariado-a-vendido/${id}`, null);
  }

  public setVolunteeringToRejected(id: number): Observable<any> {
      
    return this.http.patch<any>(`${baseURL}/cambiar-estado-voluntariado-a-rechazado/${id}`, null);

  }

  public setProductToDeleted(id: number): Observable<any> {
      
    return this.http.patch<any>(`${baseURL}/cambiar-estado-voluntariado-a-rechazado/${id}`, null);

  }
  
  public getUserVolunteerings(){
    let user_id = this.loginService.getIdUser();
    return this.http.get<any>(`${baseURL}/voluntariados-usuario/${user_id}`);
  }
}
