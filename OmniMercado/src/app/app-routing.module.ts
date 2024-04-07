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
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

import { CreateProduct } from './products/create-product/create-product.component';
import { UserProductsComponent } from './user/user-products/user-products.component';
import { ProductsPendingApprovalComponent } from './admin/products-pending-approval/products-pending-approval.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { CreateBarterComponent } from './barters/create-barter/create-barter.component';
import { UserBarterProductsComponent } from './user/user-barter-products/user-barter-products.component';
import { BarterProductsPendingApprovalComponent } from './admin/barter-products-pending-approval/barter-products-pending-approval.component';
import { InfoProductVisitorComponent } from './products/info-product-visitor/info-product-visitor.component';
import { InfoProductUserComponent } from './products/info-product-user/info-product-user.component';
import { InfoProductAdminComponent } from './products/info-product-admin/info-product-admin.component';
import { SalesComponent } from './user/sales/sales.component';
import { CreateVolunteeringComponent } from './volunteering/create-volunteering/create-volunteering.component';
import { VolunteeringsPendingApprovalComponent } from './admin/volunteerings-pending-approval/volunteerings-pending-approval.component';
import { InfoVolunteeringVisitorComponent } from './volunteering/info-volunteering-visitor/info-volunteering-visitor.component';
import { InfoVolunteeringUserComponent } from './volunteering/info-volunteering-user/info-volunteering-user.component';
import { InfoVolunteeringAdminComponent } from './volunteering/info-volunteering-admin/info-volunteering-admin.component';
import { UserVolunteeringsComponent } from './user/user-volunteerings/user-volunteerings.component';


const routes: Routes = [
  { path: "", redirectTo: 'visitante', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  { path: "admin", component: AdminComponent, canActivate: [adminGuard] },
  { path: "perfil-admin", component: AdminProfileComponent, canActivate: [adminGuard]},
  { path: "aprobacion-productos", component: ProductsPendingApprovalComponent, canActivate: [adminGuard]},
  { path: "aprobacion-intercambios", component: BarterProductsPendingApprovalComponent, canActivate: [adminGuard]},
  { path: "crear-administrativo", component: CreateAdminComponent, canActivate: [adminGuard]},
  { path: "aprobacion-voluntariados", component: VolunteeringsPendingApprovalComponent, canActivate: [adminGuard]},

  { path: "usuario", component: UserComponent , canActivate: [usuarioGuard] },
  { path: "compras", component: SalesComponent , canActivate: [usuarioGuard] },
  { path: "perfil-usuario", component: UserProfileComponent , canActivate: [usuarioGuard] },
  { path: "crear-venta", component: CreateProduct , canActivate: [usuarioGuard] },
  { path: "crear-intercambio", component: CreateBarterComponent , canActivate: [usuarioGuard] },
  
  { path: "crear-voluntariado", component: CreateVolunteeringComponent , canActivate: [usuarioGuard] },
  { path: "info-voluntariado-v", component: InfoVolunteeringVisitorComponent},
  { path: "info-voluntariado-u", component: InfoVolunteeringUserComponent, canActivate: [usuarioGuard] },
  { path: "info-voluntariado-a", component: InfoVolunteeringAdminComponent, canActivate: [adminGuard] },

  

  { path: "productos-publicados", component: UserProductsComponent , canActivate: [usuarioGuard] },
  { path: "intercambios-publicados", component: UserBarterProductsComponent , canActivate: [usuarioGuard] },
  { path: "voluntariados-publicados", component: UserVolunteeringsComponent , canActivate: [usuarioGuard] },

  { path: "info-producto-v", component: InfoProductVisitorComponent},
  { path: "info-producto-u", component: InfoProductUserComponent, canActivate: [usuarioGuard] },
  { path: "info-producto-a", component: InfoProductAdminComponent, canActivate: [adminGuard] },



  { path: "visitante", component: VisitorComponent },
  { path: "not-found", component: NotFoundComponent},
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }