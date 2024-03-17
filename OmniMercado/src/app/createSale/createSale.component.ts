import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductConditionType } from '../models/ProductConditionType';
import { CreateSaleService } from './service/create-sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProductCategory } from '../models/ProductCategory';

@Component({
  selector: 'app-create-sale',
  templateUrl: './createSale.component.html',
  styleUrls: ['./createSale.component.css']
})
export class CreateSale {

  
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  titleNull = false;
  conditionNull = false;
  categoryNull = false;
  photosNull = false;
  productConditionTypes:ProductConditionType[];
  productCategoryTypesSelected;
  productCategoryTypes:ProductCategory[];
  maxFiles: number = 5;
  photos: File[] | null = null;

  saleData:SaleData = {
    title: '',
    localCurrency: 0,
    virtualCoin: 0,
    condition: 0,
    description: '',
    categories: []
  };

  constructor(private formBuilder : FormBuilder,private saleService:CreateSaleService){}

  getProductConditionTypes(){
    this.saleService.getProductConditionTypes().subscribe({
      next: (r_success) => {
          this.productConditionTypes = r_success.conditionTypes
      },
      error: (error: HttpErrorResponse) => {
          this.handleErrorResponse(error);
      }
  });
  }

  handleErrorResponse(error: HttpErrorResponse) {
        // Swal.fire(
        //   'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
        //   'warning'
        //  );  
        console.error(error);
  }

  ngOnInit(){
    this.initForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_tipo_categoria',
      textField: 'nombre',
      allowSearchFilter: true,
      enableCheckAll:false,
      maxHeight:95,
      searchPlaceholderText:"Buscar",
      
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
    this.saleService.getProductCategory().subscribe({
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

    if(!this.titleNull && !this.conditionNull && !this.categoryNull && this.photos!=null){
        this.saleData.categories = this.selectedCategories();

        if(!(this.photos.length>this.maxFiles)){

          this.createSale()
      
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
    this.saleService.createSale(this.saleData,this.photos).subscribe({
      next: (r_success)=>{
        Swal.fire('',`${r_success.message}`,'success');
      },
      error:(err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
  }


}

interface SaleData {
  title: string;
  localCurrency: number;
  virtualCoin: number;
  condition: number;
  description: string;
  categories: any[];
}