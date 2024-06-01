import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePartyComponent } from './management/create-party/create-party.component';
import { PartyListComponent } from './management/party-list/party-list.component';

const routes: Routes = [
  { path: 'createParty', component: CreatePartyComponent },
  { path: 'updateParty/:id', component: CreatePartyComponent },
  { path: 'partyList', component: PartyListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyManagementRoutingModule { }
