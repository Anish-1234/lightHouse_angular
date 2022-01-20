import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMRoutingModule } from './crm-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list/client-list.component';


@NgModule({
  declarations: [
    UserListComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    CRMRoutingModule
  ]
})
export class CRMModule { }
