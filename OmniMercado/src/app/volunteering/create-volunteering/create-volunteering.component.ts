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
  maxVolunteersNull = false;
  categoryNull = false;
  minAgeNull = false;
  maxAgeNull = false;
  placeNull = false;
  dateNull = false;
  timeNull = false;
  oldDate = false;
  requestDescriptionNull = false;
  photosNull = false;
  codeNull = false;
  descriptionNull = false;
  productCategoryTypesSelected;
  productCategoryTypes:VolunteeringCategory[];
  maxFiles: number = 5;
  photos: File[] | null = null;
  price: number = 0;
  volunteering:VolunteeringData = {
    codigo_pago : '',
    titulo : '',
    retribucion_moneda_virtual:0,
    descripcion: '',
    lugar: '',
    fecha: null,
    hora: null,
    maximo_voluntariados: 0,
    minimo_edad: 0,
    maximo_edad: 0,
    descripcion_retribucion: '',
    categories :[]
  }
  
 
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

  calculateCost(){
    this.price = this.volunteering.retribucion_moneda_virtual * this.volunteering.maximo_voluntariados;
  }

  validateDate(){
    //validate date to be less than today
    let today = new Date();
    if(this.volunteering.fecha){
    let date = new Date(this.volunteering.fecha);
    if(date < today){
      this.oldDate = true;
    }else{
      this.oldDate = false;
    }
  }
  }

  validateData(){
   
    this.titleNull = this.volunteering.titulo == '';
    this.maxVolunteersNull = this.volunteering.maximo_voluntariados == 0 || this.volunteering.maximo_voluntariados == null;
    this.categoryNull = this.form.getRawValue().category.length ==0;
    this.descriptionNull = this.volunteering.descripcion == '';
    this.volunteering.descripcion_retribucion = this.volunteering.descripcion_retribucion == null ? '' : this.volunteering.descripcion_retribucion;
    this.maxAgeNull = this.volunteering.maximo_edad == 0 || this.volunteering.maximo_edad == null;
    this.minAgeNull = this.volunteering.minimo_edad == 0 || this.volunteering.minimo_edad == null;
    this.placeNull = this.volunteering.lugar == '';
    this.dateNull = this.volunteering.fecha == null;
    this.timeNull = this.volunteering.hora == null;
    this.photosNull = this.photos == null;
    this.volunteering.retribucion_moneda_virtual = this.volunteering.retribucion_moneda_virtual === null ? 0 : this.volunteering.retribucion_moneda_virtual;
    
    
    
    if(!this.titleNull && !this.categoryNull &&
       this.photos!=null && !this.descriptionNull &&
        !this.placeNull && !this.dateNull && !this.timeNull && 
        !this.maxVolunteersNull && !this.minAgeNull && !this.maxAgeNull){

        this.volunteering.categories = this.selectedCategories();

        if(!(this.photos.length>this.maxFiles)){

          if(this.volunteering.retribucion_moneda_virtual == 0 && this.volunteering.descripcion_retribucion == ''){
            
            this.requestDescriptionNull = true;
            return;
          }
          
          this.createVolunteering();
          

      
        }else{
          Swal.fire('',`Solo se permite un máximo de ${this.maxFiles} fotos por publicación`,'info');
        }

    }

  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.photos = files;
  }
  

  createVolunteering(){
    this.volunteeringService.createVolunteering(this.volunteering,this.photos,this.selectedCategories()).subscribe({
      next: (r_success)=>{
       Swal.fire('', r_success.message, 'success').then(() => {
          this.router.navigate(['voluntariados-publicados']);
        });
     },
      error:(err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire(
      'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
      'warning'
     );  
     console.error(error);
}
  
}

interface VolunteeringData {
  codigo_pago:string;
  titulo:string;
  retribucion_moneda_virtual:number;
  descripcion:string;
  lugar:string;
  fecha:Date | null;
  hora:Date | null;
  maximo_voluntariados:number;
  minimo_edad:number;
  maximo_edad:number;
  descripcion_retribucion:string;
  categories: any[];
}