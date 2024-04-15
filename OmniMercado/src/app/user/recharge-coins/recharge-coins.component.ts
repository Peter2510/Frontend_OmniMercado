import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recharge-coins',
  templateUrl: './recharge-coins.component.html',
  styleUrls: ['./recharge-coins.component.css']
})
export class RechargeCoinsComponent implements OnInit{


  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    
    this.userService.getBadge().subscribe({
      next: (response) => {
        this.badge = response.badge;
      },
      error: (error) => {
        Swal.fire('Error', 'Estamos experimentando problemas, intentalo más tarde', 'error');
      }
    
    })  
  }


  name: string;
  date: Date;
  cvv: number;
  cardNumber: number;
  money: number;
  ok: boolean = false;
  coins: number;
  badge: number;

  validate() {
    if (this.name && this.date && this.cvv && this.cardNumber && this.money) {
      
      
      this.userService.rechargeCoins(this.coins).subscribe({
        next: (response) => {
          
          Swal.fire({
            title: "¡Recarga exitosa!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });

        },
        error: (error) => {
          Swal.fire('Error', 'Estamos experimentando problemas, intentalo más tarde', 'error');
        }
      })
      

    } else {
      Swal.fire('Error', 'Debes ingresar todos los campos solicitados', 'error');
      
    }
  }


  calculateCoins() {
    if (this.money) {
      let result = (this.money * this.badge);
      this.coins = parseFloat(result.toFixed(2));
    } else {
      this.coins = 0;
  }
}
 

}
