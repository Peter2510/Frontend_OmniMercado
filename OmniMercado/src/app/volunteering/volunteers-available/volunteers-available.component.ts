import { Component } from '@angular/core';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringService } from '../service/volunteering.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-volunteers-available',
  templateUrl: './volunteers-available.component.html',
  styleUrls: ['./volunteers-available.component.css']
})
export class VolunteersAvailableComponent {

  volunteerings:Volunteering[] =[];

  constructor(private volunteeringService:VolunteeringService,private router:Router){}

  ngOnInit(){
    this.volunteeringService.getUserAvailableVolunteerings().subscribe({
      next: (r_success)=>{
          this.volunteerings = r_success.volunteerings;
          
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.volunteeringService.sendId({ id: id });
    this.router.navigate(['/info-voluntariado-u']);
  }  

}
