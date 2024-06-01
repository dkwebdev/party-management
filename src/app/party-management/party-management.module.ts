import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyManagementRoutingModule } from './party-management-routing.module';
import { CreatePartyComponent } from './management/create-party/create-party.component';
import { PartyListComponent } from './management/party-list/party-list.component';

@NgModule({
  declarations: [
    CreatePartyComponent,
    PartyListComponent
  ],
  imports: [
    CommonModule,
    PartyManagementRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class PartyManagementModule { }
