import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Product } from 'src/app/models/Product';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-product-visitor',
  templateUrl: './info-product-visitor.component.html',
  styleUrls: ['./info-product-visitor.component.css']
})

export class InfoProductVisitorComponent implements OnDestroy, OnInit{
  
  private subscription: Subscription;
  public product:Product;
  private idProduct: number;

  constructor(private productService: ProductService,private router:Router) {


  }


  ngOnInit(): void {
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.idProduct = data.id;
      }else{
        this.router.navigate(['not-found']);
      }
    });

    if(this.idProduct){
      this.productService.getProductById(this.idProduct).subscribe({
        next: (r_success) => {
          this.product = r_success.product;
        },
        error: (err) => {
         this.handleErrorResponse(err); 
        }
      })
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 400) {
      Swal.fire('', `${error.error.message}`, 'warning');
    } else {
      console.log(error.error)
      Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
  }

}
