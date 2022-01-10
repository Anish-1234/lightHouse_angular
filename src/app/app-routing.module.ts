import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharingComponent } from './pages/sharing/sharing.component';

const routes: Routes = [
  {path:'',redirectTo: '/login', pathMatch: 'full'},
  {path:'login',component:LoginComponent },
  {path:'Share',component:SharingComponent ,children:[
    {path:'',component:DashboardComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
