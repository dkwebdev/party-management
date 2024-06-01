import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
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
