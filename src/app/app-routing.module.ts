import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharingComponent } from './pages/sharing/sharing.component';

const routes: Routes = [
  {path:'',component:LoginComponent },
  {path:'Share',component:SharingComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
