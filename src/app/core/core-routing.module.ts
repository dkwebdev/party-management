import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../shared/layout-component/main/main.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  { path: '', 'redirectTo': '/main/login', 'pathMatch': 'full' },
  { path: 'main/login', component: UserLoginComponent },


  {
    path: 'home', canActivate: [AuthGuard], component: MainComponent, children: [
      { path: "partyManagement", loadChildren: async () => (await import("../party-management/party-management.module")).PartyManagementModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
