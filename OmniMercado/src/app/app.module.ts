import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ComprasComponent } from './usuario/compras/compras.component';
import { VentasComponent } from './usuario/ventas/ventas.component';
import { VoluntariadosComponent } from './usuario/voluntariados/voluntariados.component';
import { VisitanteComponent } from './visitante/visitante.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalUsuarioComponent } from './usuario/principal-usuario/principal-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComprasComponent,
    VentasComponent,
    AdminComponent,
    PrincipalUsuarioComponent,
    VoluntariadosComponent,
    VisitanteComponent,
    NotFoundComponent,
    PrincipalUsuarioComponent,
    SignupComponent,
    ProductosComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
