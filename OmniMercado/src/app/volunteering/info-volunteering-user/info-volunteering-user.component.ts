import { Component, OnInit } from '@angular/core';
import { Subscription, } from 'rxjs';
import { VolunteeringService } from '../service/volunteering.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ReportCategory } from 'src/app/models/ReportCategory';

@Component({
  selector: 'app-info-volunteering-user',
  templateUrl: './info-volunteering-user.component.html',
  styleUrls: ['./info-volunteering-user.component.css']
})
export class InfoVolunteeringUserComponent implements OnInit{

  private subscription: Subscription;
  private idVolunteering: number;
  stateVolunteering: number;
  private age:number;
  seeButton = false;
  dropdownList;
  dropdownSettings;
  form: FormGroup;
  categoriasSeleccionadas;
  categoriasReporte:ReportCategory[];

  constructor(private volunteeringService: VolunteeringService, private router: Router, private loginService: LoginService,private formBuilder : FormBuilder) {
    
    this.getAge();
    this.getIdVolunteering();
    this.notAvailable();
    this.getStateVolunteering();
  }

  ngOnInit(): void {
    this.initForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_categoria_reporte',
      noDataAvailablePlaceholderText:'Sin resultados',
      textField: 'nombre',
      allowSearchFilter: true,
      enableCheckAll:false,
      searchPlaceholderText:'Buscar'
    };
    this.getProductCategory();
  }

  selectedCategories(){
    return this.getObjectListFromData(this.form.value.category.map(item => item.id_categoria_reporte));
  }

  getObjectListFromData(ids:any){
    return this.getData().filter(item => ids.includes(item.id_categoria_reporte))
  }

  getData() : Array<any>{
    return this.categoriasReporte
  }

  getProductCategory(){
    this.volunteeringService.getCategoriesReport().subscribe({
      next: (r_success)=>{
        this.categoriasReporte = r_success.categories
        this.dropdownList = this.getData();
      },
      error:(error:HttpErrorResponse)=>{
        this.handleErrorResponse(error);
      }
    })
  }

  initForm(){
    this.form = this.formBuilder.group({
      category : ['',[Validators.required]]
    })
  }



  getIdVolunteering() {
    this.subscription = this.volunteeringService.data$.subscribe(data => {
      if (data) {
        this.idVolunteering = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  getAge() {
    this.loginService.getAge().subscribe({
      next: (response) => {
        this.age = response.age;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  getStateVolunteering(){
    this.volunteeringService.getStateVolunteering(this.idVolunteering).subscribe({
      next: (response) => {
        this.stateVolunteering = response.state;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  notAvailable() {
      this.volunteeringService.validateIfUserIsRegistered(this.idVolunteering).subscribe({ 
        next: (response) => {
          if (response.registered) {
            this.seeButton = false;
          } else {
            this.seeButton = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          
        }
       });
  }

  register() {
    this.volunteeringService.getRestricionVolunteering(this.idVolunteering).subscribe({
      next: (r_success) => {
        let min = parseInt(r_success.volunteering.minimo_edad);
        let max = parseInt(r_success.volunteering.maximo_edad);
      
        if (this.age < min || this.age > max) {
          Swal.fire({
            icon: 'info',
            title: 'No cumples con los requisitos de edad',
            text: 'Para poder registrarte debes tener entre ' + min + ' y ' + max + ' años',
          });
          return;
        }


        Swal.fire({
          title: '¿Estás seguro de querer registrarte?',
          text: 'Una vez registrado no podrás deshacer esta acción',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, registrarme',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.volunteeringService.registerVolunteering(this.idVolunteering).subscribe({
              next: (response) => {
                this.handleSuccessResponse(response);
              },
              error: (err: HttpErrorResponse) => {
                this.handleErrorResponse(err);
              }
            });
          }
        });
      }
    });
  }

  handleSuccessResponse(response: any) {
    Swal.fire({
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1300
    }).then(() => {
      this.router.navigate(['voluntariados']);
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: `${error.error.message}`,
    }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  report(){
    if(this.form.valid){
      Swal.fire({
        icon: 'info',
        title: '¿Estás seguro de reportar este producto?',
        confirmButtonText: 'Sí, reportar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
      }).then((result) => {
        if (!result.isDismissed) {
          this.volunteeringService.createReport(this.idVolunteering,this.selectedCategories()).subscribe({
            next: (response) => {
              this.handleSuccessResponse(response);
            },
            error: (err: HttpErrorResponse) => {
              console.error(err)
              this.handleErrorResponse(err);
            }
          });
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Por favor selecciona al menos una categoría para reportar'
      })
    }
  }


}
