import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.css']
})
export class ListClaimComponent implements OnInit {
  cars: any[];
  constructor() {
    this.cars = [];
    this.cars.push({vin: 'stm933', color: 'black', year: 2011, brand: 'Renault'});
  }

  ngOnInit(): void {
  }

}
