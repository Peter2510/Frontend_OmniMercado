import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { User} from 'src/app/models/User';
import { environment } from '../../../environments/environment';

// Usar la variable de entorno
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  
  constructor(private http:HttpClient) { 

    this.getUserCoins().subscribe({
      next: (response) => {
        this.setCoins(response.coins.cantidad_moneda_virtual);
      },
      error: (err) => {
        console.log(err);
      }
    })


   }
  ngOnInit(): void {
    
        this.getUserCoins().subscribe({
      next: (response) => {
        this.setCoins(response.coins.cantidad_moneda_virtual);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public loginStatusSubject = new Subject<boolean>;

  public validateCredentials(loginData: any): Observable<any> {

    return this.http.post<any>(`${baseURL}/validar-credenciales-login`, loginData);
      
  }
  
    public startSesion(usuario:any,photo:any){
      //Guarda el objeto retornado en el local storage
      localStorage.setItem('user',JSON.stringify(usuario));
      localStorage.setItem('profile_photo',JSON.stringify(photo));
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
      localStorage.removeItem('profile_photo');
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
  
    public getIdUser(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.id_usuario;
      }else{
        this.logOut();
        return null;
      }
    }

    public getIdAdmin(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.id_administrativo;
      }else{
        this.logOut();
        return null;
      }
    }

    public getAdmin(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.id_administrativo;
      }else{
        this.logOut();
        return null;
      }
    }

    public getCoins(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.cantidad_moneda_virtual;
      }else{
        this.logOut();
        return null;
      }
    }

    public setCoins(coins:any){
      let userStorage = this.getUser();
      if(userStorage!=null){
        userStorage.cantidad_moneda_virtual = coins;
        localStorage.setItem('user',JSON.stringify(userStorage));
        return;
      }else{
        this.logOut();
        return null;
      }
    }

    public getImage(){
      let userStorage = localStorage.getItem('profile_photo');
      if(userStorage!=null){
        return JSON.parse(userStorage);
      }else{
        this.logOut();
        return null;
      }
    }

    public getTypeImage(){
      let ImageStorage = this.getImage();
      if(ImageStorage!=null){
        return ImageStorage.type;
      }else{
        this.logOut();
        return null;
      }
    }

    public getEncodedImage(){
      let ImageStorage = this.getImage();
      if(ImageStorage!=null){
        return ImageStorage.image;
      }else{
        this.logOut();
        return null;
      }
    }

    public userActiveToPublish(){
      let userStorage = this.getUser();
      if(userStorage!=null){
        return userStorage.activo_publicar;
      }else{
        this.logOut();
        return null;
      }      
    }

    public getUserCoins(): Observable<any> {

      return this.http.get<any>(`${baseURL}/obtener-cantidad-monedas/${this.getIdUser()}`);
        
    }

    public getAge(): Observable<any> {

      return this.http.get<any>(`${baseURL}/edad/${this.getIdUser()}`);
        
    }


}
