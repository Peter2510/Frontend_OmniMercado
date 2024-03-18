import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateSaleService {


  constructor(private http: HttpClient, private loginService: LoginService) { }

  public signupStatusSubject = new Subject<boolean>;

  public getProductConditionTypes(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-condicion-productos`);
  }

  public getProductCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-productos`);
  }

  public createSale(saleData: any, photos: any,categories:any): Observable<any> {


    const formData = new FormData();

    for (const key in saleData) {
      if (saleData.hasOwnProperty(key)) {
        formData.append(key, saleData[key]);
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
    
    return this.http.post<any>(`${baseURL}/crear-publicacion-producto`, formData);

  }



}
