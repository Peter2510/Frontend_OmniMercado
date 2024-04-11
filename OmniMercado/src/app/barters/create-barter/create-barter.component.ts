import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductConditionType } from 'src/app/models/ProductConditionType';
import { CreateProductService } from 'src/app/products/create-product/service/create-product.service';
import { ProductService } from 'src/app/products/service/product.service';
import Swal from 'sweetalert2';
import { CreateBarterService } from './service/create-barter.service';

@Component({
  selector: 'app-create-barter',
  templateUrl: './create-barter.component.html',
  styleUrls: ['./create-barter.component.css']
})
export class CreateBarterComponent {
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  titleNull = false;
  conditionNull = false;
  categoryNull = false;
  photosNull = false;
  requestDescriptionNull = false;
  descriptionNull = false;
  productConditionTypes:ProductConditionType[];
  productCategoryTypesSelected;
  productCategoryTypes:ProductCategory[];
  maxFiles: number = 5;
  photos: File[] | null = null;

  barterProductData:BarterData = {
    title: '',
    virtual_coin_equivalent: 0,
    local_currency_equivalent: 0,
    description: '',
    request_description: '',
    condition: 0,
    categories: []
  };

  constructor(private formBuilder : FormBuilder,private productService:ProductService,private barterProductService:CreateBarterService,private router:Router,private loginService:LoginService){}

  getProductConditionTypes(){
    this.productService.getProductConditionTypes().subscribe({
      next: (r_success) => {
          this.productConditionTypes = r_success.conditionTypes
      },
      error: (error: HttpErrorResponse) => {
          this.handleErrorResponse(error);
      }
  });
  }

  handleErrorResponse(error: HttpErrorResponse) {
        Swal.fire(
          'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
          'warning'
         );  
  }

  ngOnInit(){
    this.initForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_tipo_categoria',
      noDataAvailablePlaceholderText:'Sin resultados',
      textField: 'nombre',
      allowSearchFilter: true,
      enableCheckAll:false,
      searchPlaceholderText:'Buscar'
    };
    this.getProductConditionTypes();
    this.getProductCategory();
  }

  initForm(){
    this.form = this.formBuilder.group({
      category : ['',[Validators.required]]
    })
  }

  handleButtonClick(){
    console.log('reactive form value ', this.form.value);
    console.log('Actual data ', this.getObjectListFromData(this.form.value.category.map(item => item.id_tipo_categoria)));
  }

  selectedCategories(){
    return this.getObjectListFromData(this.form.value.category.map(item => item.id_tipo_categoria));
  }

  getObjectListFromData(ids:any){
    return this.getData().filter(item => ids.includes(item.id_tipo_categoria))
  }

  getData() : Array<any>{
    return this.productCategoryTypes
  }

  getProductCategory(){
    this.productService.getProductCategory().subscribe({
      next: (r_success)=>{
        this.productCategoryTypes = r_success.categories
        this.dropdownList = this.getData();
      },
      error:(error:HttpErrorResponse)=>{
        this.handleErrorResponse(error);
      }
    })
  }

  setDefaultSelection(){
    let item = this.getData()[0];
    this.form.patchValue({
      category : [{
        id_tipo_categoria : item['id_tipo_categoria'],
        nombre : item['nombre']
      }]  
    })
  }

  validateData(){
  
    this.titleNull = this.barterProductData.title == '';
    this.conditionNull = this.barterProductData.condition == 0;
    this.categoryNull = this.form.getRawValue().category.length ==0;
    this.photosNull = this.photos == null;
    this.descriptionNull = this.barterProductData.description == '';
    this.requestDescriptionNull = this.barterProductData.request_description == '';

    this.barterProductData.virtual_coin_equivalent = this.barterProductData.virtual_coin_equivalent === null ? 0 : this.barterProductData.virtual_coin_equivalent;
    this.barterProductData.local_currency_equivalent = this.barterProductData.local_currency_equivalent === null ? 0 : this.barterProductData.local_currency_equivalent;
    
    if(!this.titleNull && !this.conditionNull && !this.categoryNull && this.photos!=null && !this.descriptionNull && !this.requestDescriptionNull){
        this.barterProductData.categories = this.selectedCategories();

        if(!(this.photos.length>this.maxFiles)){

          this.createSale()
          // console.log(this.selectedCategories)
      
        }else{
          Swal.fire('',`Solo se permite un máximo de ${this.maxFiles} fotos por publicación`,'info');
        }

    }

  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.photos = files;
  }
  

  createSale(){
    console.log(this.barterProductData)
    this.barterProductService.createBarterProduct(this.barterProductData,this.photos,this.selectedCategories()).subscribe({
      next: (r_success)=>{

        Swal.fire('', r_success.message, 'success').then(() => {
          this.router.navigate(['intercambios-publicados']);
        });

      },
      error:(err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
  }


}

interface BarterData {
  title: string;
  local_currency_equivalent: number;
  virtual_coin_equivalent: number;
  description: string;
  condition: number;
  request_description: string;
  categories: any[];
}

