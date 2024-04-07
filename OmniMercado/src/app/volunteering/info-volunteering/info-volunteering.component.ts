import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringService } from '../service/volunteering.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-volunteering',
  templateUrl: './info-volunteering.component.html',
  styleUrls: ['./info-volunteering.component.css']
})
export class InfoVolunteeringComponent implements OnDestroy, OnInit{
  
  private subscription: Subscription;
  public volunteering:Volunteering;
  private idVolunteering: number;

  constructor(private volunteeringService: VolunteeringService,private router:Router) {
  }


  ngOnInit(): void {
    
    this.subscription = this.volunteeringService.data$.subscribe(data => {

      if (data) {
        this.idVolunteering = data.id;
      }else{
        this.router.navigate(['not-found']);
      }
    });

    if(this.idVolunteering){
      this.volunteeringService.getVolunteeringById(this.idVolunteering).subscribe({
        next: (r_success) => {
          this.volunteering = r_success.volunteering;
          console.log(this.volunteering)
        },
        error: (err) => {
         this.handleErrorResponse(err); 
        }
      })
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 400) {
      Swal.fire('', `${error.error.message}`, 'warning');
    } else {
      console.log(error.error)
      Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
  }

}
