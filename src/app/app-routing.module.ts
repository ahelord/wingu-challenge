import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateClaimComponent} from './components/create-claim/create-claim.component';
import {ListClaimComponent} from './components/list-claim/list-claim.component';

const routes: Routes = [
  { path: 'crear-reclamo', component: CreateClaimComponent },
  { path: 'reclamos', component: ListClaimComponent },
  { path: '',   redirectTo: 'reclamos', pathMatch: 'full' }, 
  { path: '**', component: ListClaimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
