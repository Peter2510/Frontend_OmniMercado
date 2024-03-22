import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateBarterService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public signupStatusSubject = new Subject<boolean>;


  public createBarterProduct(barterProductData: any, photos: any,categories:any): Observable<any> {


    const formData = new FormData();

    for (const key in barterProductData) {
      if (barterProductData.hasOwnProperty(key)) {
        formData.append(key, barterProductData[key]);
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
    
    return this.http.post<any>(`${baseURL}/crear-publicacion-producto-trueque`, formData);

  }

  
}
