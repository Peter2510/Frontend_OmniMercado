import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './login/guard/admin/admin.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { VisitorComponent } from './visitor/visitor.component';
import { usuarioGuard } from './login/guard/usuario/usuario.guard';
import { SignupComponent } from './signup/signup.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CreateProduct } from './products/create-product/create-product.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { ProductsPendingApprovalComponent } from './admin/products-pending-approval/products-pending-approval.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { CreateBarterComponent } from './barters/create-barter/create-barter.component';


const routes: Routes = [
  { path: "", redirectTo: 'visitante', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  { path: "admin", component: AdminComponent, canActivate: [adminGuard] },
  { path: "perfil-admin", component: AdminProfileComponent, canActivate: [adminGuard]},
  { path: "aprobacion-productos", component: ProductsPendingApprovalComponent, canActivate: [adminGuard]},
  { path: "crear-administrativo", component: CreateAdminComponent, canActivate: [adminGuard]},

  { path: "usuario", component: UserComponent , canActivate: [usuarioGuard] },
  { path: "perfil-usuario", component: UserProfileComponent , canActivate: [usuarioGuard] },
  { path: "crear-venta", component: CreateProduct , canActivate: [usuarioGuard] },
  { path: "crear-intercambio", component: CreateBarterComponent , canActivate: [usuarioGuard] },
  { path: "ventas-publicadas", component: UserPostsComponent , canActivate: [usuarioGuard] },


  { path: "visitante", component: VisitorComponent },
  { path: "not-found", component: NotFoundComponent},
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }