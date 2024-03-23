import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { VisitorComponent } from './visitor/visitor.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoluntariadosComponent } from './volunteering/volunteering.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CreateProduct } from './products/create-product/create-product.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserProductsComponent } from './user/user-products/user-products.component';
import { ProductsPendingApprovalComponent } from './admin/products-pending-approval/products-pending-approval.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { BartersComponent } from './barters/barters.component';
import { CreateBarterComponent } from './barters/create-barter/create-barter.component';
import { UserBarterProductsComponent } from './user/user-barter-products/user-barter-products.component';
import { BarterProductsPendingApprovalComponent } from './admin/barter-products-pending-approval/barter-products-pending-approval.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    VisitorComponent,
    NotFoundComponent,
    SignupComponent,
    ProductsComponent,
    VoluntariadosComponent,
    UserNavComponent,
    AdminNavComponent,
    CreateProduct,
    UserProductsComponent,
    ProductsPendingApprovalComponent,
    CreateAdminComponent,
    BartersComponent,
    CreateBarterComponent,
    UserBarterProductsComponent,
    BarterProductsPendingApprovalComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }