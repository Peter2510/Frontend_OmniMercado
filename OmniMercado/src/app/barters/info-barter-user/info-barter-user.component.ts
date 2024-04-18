import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarterService } from '../service/barter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportCategory } from 'src/app/models/ReportCategory';

@Component({
  selector: 'app-info-barter-user',
  templateUrl: './info-barter-user.component.html',
  styleUrls: ['./info-barter-user.component.css']
})
export class InfoBarterUserComponent implements OnInit{


  private subscription: Subscription;
  private idBarterProduct: number;
  stateBarterProduct: number;
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  categoriasSeleccionadas;
  categoriasReporte:ReportCategory[];

  constructor(private productBarterService: BarterService, private router: Router, private loginService: LoginService,private formBuilder : FormBuilder) {
    this.getIdProduct();
    this.getStateProduct();
  }
  ngOnInit(): void {
    this.initForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_categoria_reporte',
      noDataAvailablePlaceholderText:'Sin resultados',
      textField: 'nombre',
      allowSearchFilter: true,
      enableCheckAll:false,
      searchPlaceholderText:'Buscar'
    };
    this.getProductCategory();
  }

  selectedCategories(){
    return this.getObjectListFromData(this.form.value.category.map(item => item.id_categoria_reporte));
  }

  getObjectListFromData(ids:any){
    return this.getData().filter(item => ids.includes(item.id_categoria_reporte))
  }

  getData() : Array<any>{
    return this.categoriasReporte
  }


  getProductCategory(){
    this.productBarterService.getCategoriesReport().subscribe({
      next: (r_success)=>{
        this.categoriasReporte = r_success.categories
        this.dropdownList = this.getData();
      },
      error:(error:HttpErrorResponse)=>{
        this.handleErrorResponse(error);
      }
    })
  }

  initForm(){
    this.form = this.formBuilder.group({
      category : ['',[Validators.required]]
    })
  }

  getIdProduct() {
    this.subscription = this.productBarterService.data$.subscribe(data => {
      if (data) {
        this.idBarterProduct = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  getStateProduct() {
    this.productBarterService.getStateBarterProduct(this.idBarterProduct).subscribe({
      next: (response) => {
        this.stateBarterProduct = response.state;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  toExchange() {

    Swal.fire({
      icon: 'info',
      title: '¿Estás seguro de realizar el intercambio?',
      confirmButtonText: 'Sí, intercambiar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (!result.isDismissed) {
        this.productBarterService.createBarter(this.idBarterProduct).subscribe({
          next: (response) => {
            this.loginService.setCoins(response.userCoin);
            this.handleSuccessResponse(response);
          },
          error: (err: HttpErrorResponse) => {
            this.handleErrorResponse(err);
          }
        });
      }
    })
  }



  handleSuccessResponse(response: any) {
    Swal.fire({
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1300
    }).then(() => {
      this.router.navigate(['intercambios']);
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: `${error.error.message}`,
    }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  report(){
    if(this.form.valid){
      Swal.fire({
        icon: 'info',
        title: '¿Estás seguro de reportar este producto?',
        confirmButtonText: 'Sí, reportar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
      }).then((result) => {
        if (!result.isDismissed) {
          this.productBarterService.createReport(this.idBarterProduct,this.selectedCategories()).subscribe({
            next: (response) => {
              this.handleSuccessResponse(response);
            },
            error: (err: HttpErrorResponse) => {
              console.error(err)
              this.handleErrorResponse(err);
            }
          });
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Por favor selecciona al menos una categoría para reportar'
      })
    }
  }





}
