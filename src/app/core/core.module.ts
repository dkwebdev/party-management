import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    PagenotfoundComponent,
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CoreModule { }
