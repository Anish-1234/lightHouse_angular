import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilterModel } from 'src/app/models/Client';
import { userList } from 'src/app/models/user';
import { CommonService } from 'src/app/service/common.service';
import { MockService } from 'src/app/service/mock.service';
import { Chart } from 'node_modules/chart.js';
import { reduce } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  ClientName: any
  pieChart: any;
  frequency:string="monthly"
  filterModels: FilterModel[] = [
    {
      label: 'Active',
      model: -1,
      modelName: 'active', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Active', value: true },
        { displayName: 'In Active', value: false }
      ]
    },
    {
      label: 'Type',
      model: -1,
      modelName: 'userType', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has UserType', value: true },
        { displayName: 'No UserType', value: false }
      ]
    },
    {
      label: 'VIP',
      model: -1,
      modelName: 'VIP', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has VIP', value: true },
        { displayName: 'No VIP', value: false }
      ]
    },
    {
      label: 'Ultra VIP',
      model: -1,
      modelName: 'ultraVIP', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has Ultra VIP', value: true },
        { displayName: 'No Ultra VIP', value: false }
      ]
    },
    {
      label: 'Site',
      model: -1,
      modelName: 'primarySiteContact', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has Site', value: true },
        { displayName: 'No Site', value: false }
      ]
    },
    {
      label: 'Spend',
      model: -1,
      modelName: 'spend', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has Spend', value: true },
        { displayName: 'No Spend', value: false }
      ]
    },
    {
      label: 'CST',
      model: -1,
      modelName: 'CST', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has CST', value: true },
        { displayName: 'No CST', value: false }
      ]
    },
    {
      label: 'Emails',
      model: -1,
      modelName: 'isMailOn', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has Email', value: true },
        { displayName: 'No Email', value: false }
      ]
    },
    {
      label: 'Change Approval',
      model: -1,
      modelName: 'isChangeApproval', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has Change Approval', value: true },
        { displayName: 'No Change Approval', value: false }
      ]
    },
    {
      label: 'User Admin',
      model: -1,
      modelName: 'isUserAdmin', data: [
        { displayName: 'Any', value: -1 },
        { displayName: 'Has User Admin', value: true },
        { displayName: 'No User Admin', value: false },
      ]
    },
  ];
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Telephone',
    'Mobile',
    'User_Type',
    'User_Admin_Role',
    'Change_Approval',
    'VIP',
    'Ultra_VIP',
    'CST',
    'Spend',
    'Site_Contact',
    'All_Emails',
    'Active'
  ];

  originalData: userList[] = JSON.parse(JSON.stringify(this.mockService.userList.Users.users));
  dataSource: MatTableDataSource<userList> = new MatTableDataSource<userList>();

  constructor(
    private mockService: MockService,
    private changeDetectorRef: ChangeDetectorRef,
    private commonService: CommonService,
    private router:Router) {
  }

  ngOnInit(): void {
    // const ctx = document.getElementById('myChart');

  }

  ngAfterViewInit() {
    this.initTable(this.mockService.userList.Users.users);
    this.changeDetectorRef.detectChanges();
    this.usersChart();
  }

  resetFilter() {
    this.filterModels.forEach((model) => {
      model.model = -1
    })
    this.ClientName = ''
    this.initTable(this.mockService.userList.Users.users);
  }

  applyFilter() {
    let filteredData!: userList[];
    let isAllFilterAny = true;
    this.filterModels.forEach((model) => {
      if (model.model > -1) {
        isAllFilterAny = false;
        filteredData = (filteredData || this.originalData).filter((data) => {
          if (model.modelName === 'userType' && model.model) {
            return data[model.modelName] != null;
          }
          // @ts-ignore
          return data[model.modelName] === model.model;
        });
      }
    });
    // clear all filters
    if (isAllFilterAny) {
      filteredData = this.originalData;
    }
    this.initTable(filteredData);
  }


  searchByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ClientName = filterValue
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  usersChart(): void {
    const myChart = new Chart('myChart', {
      type: 'line',
      data: {   
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: 'Activate',
              data: [4, 9, 4, 4, 4, 3],
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
          },
          {
            label: 'Deactivate',
            data: [0, 0, 0, 0, 0, 1],
            borderColor: 'rgb(15, 234, 192)',
            borderWidth: 1
        }]
      },
  });
  }

  exportAsCSV() {
    const dataArr: any[] = [];
    this.dataSource.data.forEach((element: userList) => {
      dataArr.push({
        'Name': element.name ? element.name : '--',
        'Email': element.emailAddress ? element.emailAddress : '--',
        'Telephone': element.telephone ? element.telephone : '--',
        'Mobile': element.mobile ? element.mobile : '--',
        'User Type': element.userType ? element.userType : '--',
        'User Admin Role': element.isUserAdmin ? 'Has User Admin' : 'No User Admin',
        'Change Approval': element.isChangeApproval ? 'Has Change Approval' : 'No Change Approval',
        'VIP': element.VIP ? 'Has VIP' : 'No VIP',
        'Ultra VIP': element.ultraVIP ? 'Has Ultra VIP' : 'No Ultra VIP',
        'CST': element.CST ? 'Has CST' : 'No CST',
        'Spend': element.spend ? 'Has Spend' : 'No Spend',
        'Site Contact': element.primarySiteContact ? 'Has Site' : 'No Site',
        'All Emails': element.isMailOn ? 'Has Email' : 'No Email',
        'Active': element.active ? 'Active' : 'In Active'
      });
    });
    this.commonService.exportAsExcelFile(dataArr, 'Client Management List')
  }

  private initTable(filteredData: userList[]) {
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
