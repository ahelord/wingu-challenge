import { Component, OnInit } from '@angular/core';
import {Claim} from '../../shared/models/claim.model';
import {Commune} from '../../shared/models/commune.model';
import {CommuneService} from '../../shared/services/commune.service';
import {ClaimService} from '../../shared/services/claim.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css']
})
export class CreateClaimComponent implements OnInit {
  claim: Claim;
  communes: Commune[];
  commune: Commune;
  isSuccess: boolean;
  isMissingField: boolean;

  constructor(private communeService: CommuneService,
              private claimService: ClaimService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isSuccess = false;
    this.isMissingField = false;

    this.claim = new Claim();
    this.communeService.getCommunes()
      .subscribe((communesSnapshot) => {
      this.communes = [];
      communesSnapshot.forEach((communesData: any) => {
        this.communes.push({
          id: communesData.payload.doc.id,
          name: communesData.payload.doc.data().name
        });
      });
    });
  }


  ngOnInit(): void {
    console.log(this.communes);
  }

  createClaim(claim: Claim){
    claim.communeId=this.commune.id;
    claim.communeName=this.commune.name;
    this.claimService.createClaim(claim)
      .then(claimRespond => {
        this.isSuccess = true;
      });
  }

  goToClaims() {
    this.router.navigate(['reclamos']);
  }

}
