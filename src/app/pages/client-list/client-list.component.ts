import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  colorControl = new FormControl('one');
  clientForm:ClientForm[]=[
    {key:'Active',formName:'Active'},
    {key:'Solarwinds',formName:'Any'},
    {key:'IASO',formName:'Any'},
    {key:'Mail',formName:'Any'},
    {key:'CEL',formName:'Any'},
    {key:'CST',formName:'Any'},
    {key:'Site Contact',formName:'Any'},
    {key:'Roadmaps',formName:'Any'},
    {key:'teams',formName:'Any'},
  ]
  recentConversation:string[]=['Name','Primary_Site_Contact','CST','Solarwinds','IASO','Mail_Scanning','CEL','Active','Team','Reveiw_Date']
  // dataSource = this.mock.userData;
  dataSource = new MatTableDataSource(this.mock.userData);
  constructor(private mock:MockService) { }

  ngOnInit(): void {
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
