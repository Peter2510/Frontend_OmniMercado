import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductConditionType } from '../../models/ProductConditionType';
import { CreateProductService } from './service/create-product.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProductCategory } from '../../models/ProductCategory';
import { LoginService } from '../../login/service/login.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProduct {

  
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  titleNull = false;
  conditionNull = false;
  categoryNull = false;
  photosNull = false;
  descriptionNull = false;
  productConditionTypes:ProductConditionType[];
  productCategoryTypesSelected;
  productCategoryTypes:ProductCategory[];
  maxFiles: number = 5;
  photos: File[] | null = null;

  saleData:SaleData = {
    title: '',
    virtualCoin: 0,
    condition: 0,
    description: '',
    categories: []
  };

  constructor(private formBuilder : FormBuilder,private createProductService:CreateProductService,private productService:ProductService,private router:Router,private loginService:LoginService){}

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

  onItemSelect($event:any){
    //console.log('$event is ', $event); 
    //this.handleButtonClick();
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
  
    this.titleNull = this.saleData.title == '';
    this.conditionNull = this.saleData.condition == 0;
    this.categoryNull = this.form.getRawValue().category.length ==0;
    this.photosNull = this.photos == null;
    this.descriptionNull = this.saleData.description == '';

    this.saleData.virtualCoin = this.saleData.virtualCoin === null ? 0 : this.saleData.virtualCoin;
    
    if(!this.titleNull && !this.conditionNull && !this.categoryNull && this.photos!=null && !this.descriptionNull){
        this.saleData.categories = this.selectedCategories();

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
    this.createProductService.createProduct(this.saleData,this.photos,this.selectedCategories()).subscribe({
      next: (r_success)=>{

        const message = this.loginService.userActiveToPublish() === 0 ? 'Publicacion pendiente de aprobación' : r_success.message;

        Swal.fire('', message, 'success').then(() => {
          this.router.navigate(['productos-publicados']);
        });
        
      },
      error:(err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
  }


}

interface SaleData {
  title: string;
  virtualCoin: number;
  condition: number;
  description: string;
  categories: any[];
}