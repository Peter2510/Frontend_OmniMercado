import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

    productos = [

        {nombre:'Producto1',descripcion:'Descripcion producto 1'},
        {nombre:'Producto2',descripcion:'Descripcion producto 2'},
        {nombre:'Producto3',descripcion:'Descripcion producto 3'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4'},
    ]

}
