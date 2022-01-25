import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { managerClients } from 'src/app/models/managers';
import { userList } from 'src/app/models/user';//-->
import { MockService } from 'src/app/service/mock.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  OwnerName: any
  originalData: managerClients[] = JSON.parse(JSON.stringify(this.mockService.managers.managerClients));
  dataSource!:any[] ;

  constructor(
    private mockService: MockService,
    private changeDetectorRef: ChangeDetectorRef,
    private router:Router) {  
  }

  ngOnInit(): void {
    this.initTable(this.originalData);
  }

  resetFilter() {
    this.OwnerName = ''
    this.initTable(this.originalData);
  }

  applyFilter() {
   let filteredData:managerClients[];
   let isAllFilterAny = true;
   filteredData=this.originalData.filter(data=>{
     isAllFilterAny = false;
     return data['managerName'].includes(this.OwnerName)
   })
   if (isAllFilterAny) {
    filteredData = this.originalData;
  }
   this.initTable(filteredData) 
  }

  private initTable(filteredData: managerClients[]) {
    this.dataSource=filteredData
  }
}
