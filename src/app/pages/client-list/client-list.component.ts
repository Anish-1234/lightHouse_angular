import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MockService } from 'src/app/service/mock.service';
export interface ClientForm{
  key:string;
  formName:string;
  values:string[]
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
  clientData:ClientForm[]=[
    {key:'Active',formName:'active',values:['Active','In Active']},
    {key:'Solarwinds',formName:'solarwinds',values:['Has Solarwinds','No Solarwinds']},
    {key:'IASO',formName:'IASO',values:['Has IASO','No IASO']},
    {key:'Mail',formName:'Mail',values:['Has Mail','No Mail']},
    {key:'CEL',formName:'CEL',values:['Has CEL','No CEL']},
    {key:'CST',formName:'CST',values:['Has CST','No CST']},
    {key:'Site Contact',formName:'site_contact',values:['Has Site Contact','No Site Contact']},
    {key:'Roadmaps',formName:'roadmaps',values:['Has Roadmaps','No Roadmaps']},
    {key:'teams',formName:'teams',values:['Atlantis','Nautilus','Watchtower','Apollo','Soteria']},
  ]
  clientList:string[]=['Name','Primary_Site_Contact','CST','Solarwinds','IASO','Mail_Scanning','CEL','Active','Team','Reveiw_Date']
  dataSource = new MatTableDataSource(this.mock.userData.Clients.clients);
  constructor(private mock:MockService ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // console.log('-=-==-=-=-=--=->',this.mock.userData.Clients.clients);
    this.clientListForm=this.formBuilder.group({
      active:[''],
      solarwinds:[''],
      IASO:[''],
      Mail:[''],
      CEL:[''],
      CST:[''],
      site_contact:[''],
      roadmaps:[''],
      teams:['']
    })   
    console.log(this.clientListForm);
     
  }
  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator 
  }
  filter(event:Event){
    this.dataSource.filter='Active'
  }
  // handlePageEvent(event: PageEvent) {
  //   this.length = event.length;
  //   this.pageSize = event.pageSize;
  //   this.pageIndex = event.pageIndex;
  // }
}
