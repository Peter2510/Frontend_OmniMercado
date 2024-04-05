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

  constructor(private http: HttpClient) { }

  public getVolunteeringCategory(): Observable<any> {

    return this.http.get<any>(`${baseURL}/obtener-categorias-voluntariados`);
  }
  
}
