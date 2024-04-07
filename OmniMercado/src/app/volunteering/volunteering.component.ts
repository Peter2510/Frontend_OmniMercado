import { Component, OnInit } from '@angular/core';
import { Volunteering } from '../models/Volunteering';
import { Router } from '@angular/router';
import { VolunteeringService } from './service/volunteering.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-volunteering',
  templateUrl: './volunteering.component.html',
  styleUrls: ['./volunteering.component.css']
})

export class VoluntariadosComponent implements OnInit {


  volunteerings: Volunteering[] = [];

  constructor(private volunteeringService: VolunteeringService, private router: Router) {

  }

  ngOnInit() {
    this.volunteeringService.getAvailableVolunteerings().subscribe({
      next: (r_success) => {
        this.volunteerings = r_success.volunteerings;
      },
      error: (err: HttpErrorResponse) => {

      }
    })
  }

  public seeProductDetails(id: any) {
    this.volunteeringService.sendId({ id: id });
    this.router.navigate(['/info-voluntariado-v']);
  }


}
