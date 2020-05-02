import {Component, OnInit} from '@angular/core';
import {Claim} from '../../shared/models/claim.model';
import {Commune} from '../../shared/models/commune.model';
import {CommuneService} from '../../shared/services/commune.service';
import {ClaimService} from '../../shared/services/claim.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

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
              private router: Router,
              private storage: AngularFireStorage) {
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
  }

  onChangeComune(event) {
    this.claim.communeId = event.value.id;
    this.claim.communeName = event.value.name;
  }

  createClaim(claim: Claim) {

    this.isMissingField = claim.title === '' ||
      claim.description === undefined || claim.imageUrl === undefined ||
      claim.communeName === undefined || claim.communeId === undefined;

    if (this.isMissingField) {
      this.isSuccess = false;
    } else {
      this.claimService.createClaim(claim)
        .then(claimRespond => {
          this.isMissingField = false;
          this.isSuccess = true;
        });

    }


  }

  onUpload(event) {
    const name = event.files[0].name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, event.files[0]).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.claim.imageUrl = url;
        });
      })
    ).subscribe();
  }

  goToClaims() {
    this.router.navigate(['reclamos']);
  }

}
