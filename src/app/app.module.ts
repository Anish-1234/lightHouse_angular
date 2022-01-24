import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SidebarComponent } from './pages/sharing/sidebar/sidebar.component';
import { HeaderComponent } from './pages/sharing/header/header.component';
import { SharingComponent } from './pages/sharing/sharing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ClientListComponent } from './pages/client-list/client-list.component';
import { MockService } from './service/mock.service';
import { NgChartsModule} from 'ng2-charts'
// import { Chart } from 'chart.js';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    SharingComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [MockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
