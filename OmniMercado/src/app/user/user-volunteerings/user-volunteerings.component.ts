import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringService } from 'src/app/volunteering/service/volunteering.service';

@Component({
  selector: 'app-user-volunteerings',
  templateUrl: './user-volunteerings.component.html',
  styleUrls: ['./user-volunteerings.component.css']
})
export class UserVolunteeringsComponent {
  
  volunteerings:Volunteering[] =[];

  constructor(private volunteeringService:VolunteeringService){}

  ngOnInit(){
    this.volunteeringService.getUserVolunteerings().subscribe({
      next: (r_success)=>{
          this.volunteerings = r_success.volunteerings;
      },
      error: (err:HttpErrorResponse)=>{
        
      }
    })
  }
}
