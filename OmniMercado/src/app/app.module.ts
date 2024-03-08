import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { VisitanteComponent } from './visitor/visitor.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalUsuarioComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ProductosComponent } from './sales/products.component';
import { FormsModule } from '@angular/forms';
import { VoluntariadosComponent } from './volunteering/volunteering.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PrincipalUsuarioComponent,
    VisitanteComponent,
    NotFoundComponent,
    PrincipalUsuarioComponent,
    SignupComponent,
    ProductosComponent,
    VoluntariadosComponent
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
