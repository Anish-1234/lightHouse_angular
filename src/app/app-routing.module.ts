import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
// import { ClientListComponent } from './pages/client-list/client-list.component';
import { UserListComponent } from './pages/crm/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharingComponent } from './pages/sharing/sharing.component';

const routes: Routes = [
  {path:'',redirectTo: '/login', pathMatch: 'full'},
  {path:'login',component:LoginComponent },
  {path:'share',component:SharingComponent ,children:[
    {path:'',redirectTo: '/dashboard', pathMatch: 'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'crm',loadChildren:()=>import('./pages/crm/crm.module').then(module=>module.CRMModule)}
    // {path:'client-list',component:ClientListComponent},
    // {path:'user-list',component:UserListComponent}
  ]},
  {path:'**',component:PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
