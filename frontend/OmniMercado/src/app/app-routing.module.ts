import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './login/guard/admin/admin.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalUsuarioComponent } from './usuario/principal-usuario/principal-usuario.component';
import { VisitanteComponent } from './visitante/visitante.component';
import { usuarioGuard } from './login/guard/usuario/usuario.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: "", redirectTo: 'visitante', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "admin", component: AdminComponent, /*canActivate: [adminGuard]*/ },
  { path: "usuario", component: PrincipalUsuarioComponent ,/* canActivate: [usuarioGuard]*/ },
  { path: "visitante", component: VisitanteComponent },
  { path: "not-found", component: NotFoundComponent},
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }