import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CreateSaleService } from '../createSale/service/create-sale.service';
import { ProductCategory } from '../models/ProductCategory';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent {
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  productCategoryTypesSelected;
  productCategoryTypes:ProductCategory[];


  constructor(private formBuilder : FormBuilder,private saleService:CreateSaleService){}

  ////////////////////////////////////////////
  ngOnInit() {
    this.initForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_tipo_categoria',
      noDataAvailablePlaceholderText: 'Sin resultados',
      textField: 'nombre',
      allowSearchFilter: true,
      enableCheckAll: false,
      maxHeight: 95,
      searchPlaceholderText: 'Buscar'
    };
    this.getProductCategory();
  }

  initForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]]
    })
  }

  handleButtonClick() {
    console.log('reactive form value ', this.form.value);
    console.log('Actual data ', this.getObjectListFromData(this.form.value.category.map(item => item.id_tipo_categoria)));
  }

  onItemSelect($event: any) {
    //console.log('$event is ', $event); 
    //this.handleButtonClick();
  }

  selectedCategories() {
    return this.getObjectListFromData(this.form.value.category.map(item => item.id_tipo_categoria));
  }

  getObjectListFromData(ids: any) {
    return this.getData().filter(item => ids.includes(item.id_tipo_categoria))
  }

  getData(): Array<any> {
    return this.productCategoryTypes
  }

  getProductCategory() {
    this.saleService.getProductCategory().subscribe({
      next: (r_success) => {
        this.productCategoryTypes = r_success.categories
        this.dropdownList = this.getData();
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      }
    })
  }

  setDefaultSelection() {
    let item = this.getData()[0];
    this.form.patchValue({
      category: [{
        id_tipo_categoria: item['id_tipo_categoria'],
        nombre: item['nombre']
      }]
    })
  }


  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire(
      'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
      'warning'
    );
  }

}
