import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

    products = [

        {nombre:'Producto1',descripcion:'Descripcion producto 1',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto2',descripcion:'Descripcion producto 2',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto3',descripcion:'Descripcion producto 3',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
        {nombre:'Producto4',descripcion:'Descripcion producto 4',fecha_publicacion:'2024-03-12'},
    ]

}
