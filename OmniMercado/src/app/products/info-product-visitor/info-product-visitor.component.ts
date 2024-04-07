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

export class InfoProductVisitorComponent {}
