import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { User} from 'src/app/models/User';
import { environment } from '../../../environments/environment';

// Usar la variable de entorno
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>;

  public validateCredentials(loginData: any): Observable<any> {

    return this.http.post<any>(`${baseURL}/validar-credenciales-login`, loginData);
      
  }
  
    public startSesion(usuario:any){
      //Guarda el objeto retornado en el local storage
      localStorage.setItem('user',JSON.stringify(usuario));
    }
  
    public isLogged(){
      let userStorage = localStorage.getItem('user');
  
      if(userStorage==undefined || userStorage == '' || userStorage == null){
        return false;
      }else{
        return true;
      }
  
    }
  
    public logOut(){
      localStorage.removeItem('user');
      return true;
    }
  
    public getUser(){
      let userStorage = localStorage.getItem('user');
      if(userStorage!=null){
        return JSON.parse(userStorage);
      }else{
        this.logOut();
        return null;
      }
    }
  
    public getRole(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.tipo_usuario;
      }else{
        this.logOut();
        return null;
      }
    }
  
    public getName(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.nombre;
      }else{
        this.logOut();
        return null;
      }
    }
  
    public getUserName(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.usuario;
      }else{
        this.logOut();
        return null;
      }
    }
  
    public getId(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage._id;
      }else{
        this.logOut();
        return null;
      }
    }


}
