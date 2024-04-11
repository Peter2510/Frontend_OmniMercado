import { Component, OnInit } from '@angular/core';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  countProducts:number;
  countVolunteerings:number
  countBarterProducts:number
  
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getCountPostPendingApproval().subscribe({
      next: (data) => {
        this.countProducts = data.countProducts;
        this.countVolunteerings = data.countVolunteerings;
        this.countBarterProducts = data.countBarterProducts;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  

}
