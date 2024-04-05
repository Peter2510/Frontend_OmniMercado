import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringCategory } from 'src/app/models/VolunteeringCategory';
import Swal from 'sweetalert2';
import { VolunteeringService } from '../service/volunteering.service';

@Component({
  selector: 'app-create-volunteering',
  templateUrl: './create-volunteering.component.html',
  styleUrls: ['./create-volunteering.component.css']
})
export class CreateVolunteeringComponent {

  dropdownList;
  dropdownSettings;
  form: FormGroup;
  titleNull = false;
  conditionNull = false;
  categoryNull = false;
  photosNull = false;
  requestDescriptionNull = false;
  descriptionNull = false;
  productCategoryTypesSelected;
  productCategoryTypes:VolunteeringCategory[];
  maxFiles: number = 5;
  photos: File[] | null = null;
  volunteering:VolunteeringData = {
    codigo_pago : '',
    titulo : '',
    retribucion_moneda_virtual: 0,
    descripcion: '',
    lugar: '',
    fecha: new Date(),
    hora: new Date(),
    maximo_voluntariados: 0,
    minimo_edad: 0,
    maximo_edad: 0,
    id_estado: 0,
    descripcion_retribucion: '',
    fecha_publicacion: new Date(),
    categories :[]
  }
  price:number = this.volunteering.retribucion_moneda_virtual * this.volunteering.maximo_voluntariados;
 

  constructor(private formBuilder : FormBuilder,private router:Router,private loginService:LoginService,private volunteeringService:VolunteeringService){}

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
    this.getVolunteeringCategory();
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

  getVolunteeringCategory(){
    this.volunteeringService.getVolunteeringCategory().subscribe({
      next: (r_success)=>{
        this.productCategoryTypes = r_success.categories
        this.dropdownList = this.getData();
        console.log(this.dropdownList)
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

  // validateData(){
  
  //   this.titleNull = this.volunteering.titulo == '';
  //   this.categoryNull = this.form.getRawValue().category.length ==0;
  //   this.photosNull = this.photos == null;
  //   this.descriptionNull = this.volunteering.descripcion == '';
  //   this.requestDescriptionNull = this.volunteering.descripcion_retribucion == '';
  //   this.volunteering.retribucion_moneda_virtual = this.volunteering.retribucion_moneda_virtual === null ? 0 : this.volunteering.retribucion_moneda_virtual;
  //   this.volunteering.lugar = this.volunteering.lugar === null ? '' : this.volunteering.lugar;
    
    
  //   if(!this.titleNull && !this.conditionNull && !this.categoryNull && this.photos!=null && !this.descriptionNull && !this.requestDescriptionNull){
  //       this.volunteering.categories = this.selectedCategories();

  //       if(!(this.photos.length>this.maxFiles)){

  //         this.createSale()
  //         // console.log(this.selectedCategories)
      
  //       }else{
  //         Swal.fire('',`Solo se permite un máximo de ${this.maxFiles} fotos por publicación`,'info');
  //       }

  //   }

  // }

  onFileChange(event: any) {
    const files = event.target.files;
    this.photos = files;
  }
  

  // createSale(){
  //   console.log(this.volunteering)
  //   this.barterProductService.createBarterProduct(this.volunteering,this.photos,this.selectedCategories()).subscribe({
  //     next: (r_success)=>{

  //       const message = this.loginService.userActiveToPublish() === 0 ? 'Publicacion pendiente de aprobación' : r_success.message;

  //       Swal.fire('', message, 'success').then(() => {
  //         this.router.navigate(['intercambios-publicados']);
  //       });

  //     },
  //     error:(err:HttpErrorResponse)=>{
  //       this.handleErrorResponse(err);
  //     }
  //   })
  // }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire(
      'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
      'warning'
     );  
}
  
}

interface VolunteeringData {
  codigo_pago:string;
  titulo:string;
  retribucion_moneda_virtual:number;
  descripcion:string;
  lugar:string;
  fecha:Date;
  hora:Date;
  maximo_voluntariados:number;
  minimo_edad:number;
  maximo_edad:number;
  id_estado:number;
  descripcion_retribucion:string;
  fecha_publicacion:Date;
  categories: any[];
}