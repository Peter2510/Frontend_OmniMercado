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
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { InfoProductVisitorComponent } from './products/info-product-visitor/info-product-visitor.component';
import { InfoProductUserComponent } from './products/info-product-user/info-product-user.component';
import { InfoProductAdminComponent } from './products/info-product-admin/info-product-admin.component';
import { VisitorNavComponent } from './visitor/visitor-nav/visitor-nav.component';
import { InfoProductComponent } from './products/info-product/info-product.component';
import { SalesComponent } from './user/sales/sales.component';
import { CreateVolunteeringComponent } from './volunteering/create-volunteering/create-volunteering.component';
import { VolunteeringsPendingApprovalComponent } from './admin/volunteerings-pending-approval/volunteerings-pending-approval.component';
import { InfoVolunteeringComponent } from './volunteering/info-volunteering/info-volunteering.component';
import { InfoVolunteeringAdminComponent } from './volunteering/info-volunteering-admin/info-volunteering-admin.component';
import { InfoVolunteeringUserComponent } from './volunteering/info-volunteering-user/info-volunteering-user.component';
import { InfoVolunteeringVisitorComponent } from './volunteering/info-volunteering-visitor/info-volunteering-visitor.component';
import { UserVolunteeringsComponent } from './user/user-volunteerings/user-volunteerings.component';


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
    BarterProductsPendingApprovalComponent,
    AdminProfileComponent,
    UserProfileComponent,
    InfoProductVisitorComponent,
    InfoProductUserComponent,
    InfoProductAdminComponent,
    VisitorNavComponent,
    InfoProductComponent,
    SalesComponent,
    CreateVolunteeringComponent,
    VolunteeringsPendingApprovalComponent,
    InfoVolunteeringComponent,
    InfoVolunteeringAdminComponent,
    InfoVolunteeringUserComponent,
    InfoVolunteeringVisitorComponent,
    UserVolunteeringsComponent
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