import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/login/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportCategory } from 'src/app/models/ReportCategory';

@Component({
  selector: 'app-info-product-user',
  templateUrl: './info-product-user.component.html',
  styleUrls: ['./info-product-user.component.css']
})
export class InfoProductUserComponent implements OnInit {

  private subscription: Subscription;
  private idProduct: number;
  stateProduct: number;
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  categoriasSeleccionadas;
  categoriasReporte:ReportCategory[];

  constructor(private productService: ProductService, private router: Router, private loginService: LoginService,private formBuilder : FormBuilder) {
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
    this.productService.getCategoriesReport().subscribe({
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
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.idProduct = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  getStateProduct(){
    this.productService.getStateProduct(this.idProduct).subscribe({
      next: (response) => {
        this.stateProduct = response.state;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  purchase() {
    this.productService.getPriceProduct(this.idProduct).subscribe({
      next: (r_success) => {
        let price = parseFloat(r_success.price);
        let userCoin = parseFloat(this.loginService.getCoins());

        if (price > userCoin) {
          Swal.fire({
            icon: 'info',
            title: 'No tienes suficientes monedas para realizar la compra',
            text: 'Puedes recargar monedas, o pagar al crédito que debes pagar con tus monedas ganadas.',
            confirmButtonText: 'Pagar con crédito',
            cancelButtonText: 'Regresar',
            showCancelButton: true
          }).then((result) => {
            if (result.isDismissed) {
              return;
            } else {
              this.productService.createSale(this.idProduct).subscribe({
                next: (response) => {

                  this.loginService.setCoins(response.userCoin);
                  this.handleSuccessResponse(response);
                },
                error: (err: HttpErrorResponse) => {
                  this.handleErrorResponse(err);
                }
              });
            }
          });
          return;
        } else {
          Swal.fire({
            icon: 'info',
            title: '¿Estás seguro de realizar la compra?',
            text: 'Se te descontarán ' + price + ' monedas de tu cuenta',
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true
          }).then((result) => {
            if (!result.isDismissed) {
              this.productService.createSale(this.idProduct).subscribe({
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
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
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
      this.router.navigate(['compras']);
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
          this.productService.createReport(this.idProduct,this.selectedCategories()).subscribe({
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
