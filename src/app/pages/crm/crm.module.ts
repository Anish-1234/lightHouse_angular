import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CRMRoutingModule } from './crm-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ClientListComponent } from './client-list/client-list.component';
import { NgChartsModule} from 'ng2-charts'


@NgModule({
  declarations: [
    UserListComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    AngularMaterialModule,
    CRMRoutingModule,
  ]
})
export class CRMModule { }
