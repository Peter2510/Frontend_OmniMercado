import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarterService } from '../service/barter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-barter-user',
  templateUrl: './info-barter-user.component.html',
  styleUrls: ['./info-barter-user.component.css']
})
export class InfoBarterUserComponent {


  private subscription: Subscription;
  private idBarterProduct: number;
  stateBarterProduct: number;

  constructor(private productBarterService: BarterService, private router: Router, private loginService: LoginService) {
    this.getIdProduct();
    this.getStateProduct();
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
