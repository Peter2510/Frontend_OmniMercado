import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringService } from 'src/app/volunteering/service/volunteering.service';

@Component({
  selector: 'app-inscriptions-user',
  templateUrl: './inscriptions-user.component.html',
  styleUrls: ['./inscriptions-user.component.css']
})
export class InscriptionsUserComponent {
  volunteerings:Volunteering[] =[];

  constructor(private VolunteeringService:VolunteeringService,private router:Router){}

  ngOnInit(){
    this.VolunteeringService.userVolunteerRegistrations().subscribe({
      next: (r_success)=>{
          this.volunteerings = r_success.volunteerings;
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.VolunteeringService.sendId({ id: id });
    this.router.navigate(['/info-voluntariado-u']);
  }
}
