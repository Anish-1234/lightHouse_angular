import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MockService } from 'src/app/service/mock.service';
export interface ClientForm{
  key:string;
  formName:string;
}
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  clientListForm:any
  // colorControl = new FormControl('one');
  clientData:ClientForm[]=[
    {key:'Active',formName:'active'},
    {key:'Solarwinds',formName:'solarwinds'},
    {key:'IASO',formName:'IASO'},
    {key:'Mail',formName:'Mail'},
    {key:'CEL',formName:'CEL'},
    {key:'CST',formName:'CST'},
    {key:'Site Contact',formName:'site_contact'},
    {key:'Roadmaps',formName:'roadmaps'},
    {key:'teams',formName:'teams'},
  ]
  clientList:string[]=['Name','Primary_Site_Contact','CST','Solarwinds','IASO','Mail_Scanning','CEL','Active','Team','Reveiw_Date']
  dataSource = new MatTableDataSource(this.mock.userData);
  constructor(private mock:MockService ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientListForm=this.formBuilder.group({
      active:['one'],
      solarwinds:['one'],
      IASO:['one'],
      Mail:['one'],
      CEL:['one'],
      CST:['one'],
      site_contact:['one'],
      roadmaps:['one'],
      teams:['one']
    })    
  }
  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator
  }
  // handlePageEvent(event: PageEvent) {
  //   this.length = event.length;
  //   this.pageSize = event.pageSize;
  //   this.pageIndex = event.pageIndex;
  // }
}
