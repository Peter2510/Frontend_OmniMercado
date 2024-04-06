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

  constructor(private http: HttpClient,private loginService:LoginService) { }

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

}
