import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ClaimService} from '../../shared/services/claim.service';
import {Claim} from '../../shared/models/claim.model';

@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.css']
})
export class ListClaimComponent implements OnInit {
  cars: any[];
  claims: Claim[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private claimService: ClaimService) {
    this.cars = [];
    this.cars.push({vin: 'stm933', color: 'black', year: 2011, brand: 'Renault'});
    this.claimService.getClaims()
      .subscribe((claimsSnapshot) => {
        this.claims = [];
        claimsSnapshot.forEach((claimsData: any) => {
          this.claims.push({
            id: claimsData.payload.doc.id,
            title: claimsData.payload.doc.data().title,
            description: claimsData.payload.doc.data().description,
            imageUrl: claimsData.payload.doc.data().imageUrl,
            communeId: claimsData.payload.doc.data().communeId,
            communeName: claimsData.payload.doc.data().communeName
          });
        });
      });
  }

  ngOnInit(): void {
  }

  goToCreateClaim() {
    this.router.navigate(['crear-reclamo']);
  }
}
