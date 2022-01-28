import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ManagersComponent } from './managers/managers.component';
import { ServicesComponent } from './services/services.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'user-list',component:UserListComponent},
  {path:'client-list',component:ClientListComponent},
  {path:'managers',component:ManagersComponent},
  {path:'services',component:ServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
