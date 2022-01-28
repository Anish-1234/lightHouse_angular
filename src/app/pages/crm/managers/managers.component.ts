import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { managerClients } from 'src/app/models/managers';
import { MockService } from 'src/app/service/mock.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  OwnerName: any
  originalData: managerClients[] = JSON.parse(JSON.stringify(this.mockService.managers.managerClients));
  dataSource!: managerClients[];

  constructor(
    private mockService: MockService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initTable(this.originalData);
  }

  resetFilter() {
    this.OwnerName = ''
    this.initTable(this.originalData);
  }

  applyFilter() {
    let filteredData!: managerClients[];
    if (this.OwnerName) {
      filteredData = this.originalData.filter(data => { 
        return data['managerName'].toLowerCase().includes(this.OwnerName.toLowerCase())
      })
      this.initTable(filteredData)
    }
    else {
      this.initTable(this.originalData)
    }
  }

  private initTable(filteredData: managerClients[]) {
    this.dataSource = filteredData
  }
}
