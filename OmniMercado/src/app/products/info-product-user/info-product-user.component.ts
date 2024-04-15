import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-info-product-user',
  templateUrl: './info-product-user.component.html',
  styleUrls: ['./info-product-user.component.css']
})
export class InfoProductUserComponent {

  private subscription: Subscription;
  private idProduct: number;
  stateProduct: number;

  constructor(private productService: ProductService, private router: Router, private loginService: LoginService) {
    this.getIdProduct();
    this.getStateProduct();
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
      this.router.navigate(['mis-compras']);
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

}
