import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'user-list',component:UserListComponent},
  {path:'client-list',component:ClientListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
