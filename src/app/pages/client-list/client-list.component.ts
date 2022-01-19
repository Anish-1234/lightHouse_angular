import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from 'src/app/service/common.service';
import {MockService} from 'src/app/service/mock.service';

export interface FilterModel {
  label: string;
  model: any;
  modelName: string;
  data: DropdownData[]
}

export interface DropdownData {
  displayName: string;
  value: any;
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // length = 100;
  pageSize = 10;
  pageIndex = 0;
  excelData!:any[]
  totalClient:any
  pageSizeOptions = [5, 10, 25];
  sortedData:any
  filterModels: FilterModel[] = [
    {
      label: 'Active',
      model: -1,
      modelName: 'isActive', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Active', value: true},
        {displayName: 'In Active', value: false}
      ]
    },
    {
      label: 'Solarwinds',
      model: -1,
      modelName: 'gfiId', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has Solarwinds', value: true},
        {displayName: 'No Solarwinds', value: false}
      ]
    },
    {
      label: 'IASO',
      model: -1,
      modelName: 'iasoId', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has IASO', value: true},
        {displayName: 'No IASO', value: false}
      ]
    },
    {
      label: 'Mail',
      model: -1,
      modelName: 'isInternalTicketEmail', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has Mail', value: true},
        {displayName: 'No Mail', value: false}
      ]
    },
    {
      label: 'CEL',
      model: -1,
      modelName: 'CEL', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has CEL', value: true},
        {displayName: 'No CEL', value: false}
      ]
    },
    {
      label: 'CST',
      model: -1,
      modelName: 'isHavingCSTUsers', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has CST', value: true},
        {displayName: 'No CST', value: false}
      ]
    },
    {
      label: 'Site Contact',
      model: -1,
      modelName: 'isHavingPrimarySiteContact', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has Site Contact', value: true},
        {displayName: 'No Site Contact', value: false}
      ]
    },
    { // not clear
      label: 'Roadmaps',
      model: -1,
      modelName: 'roadmaps', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Has Roadmaps', value: true},
        {displayName: 'No Roadmaps', value: false}
      ]
    },
    {
      label: 'teams',
      model: -1,
      modelName: 'teamId', data: [
        {displayName: 'Any', value: -1},
        {displayName: 'Altantis', value: 1},
        {displayName: 'Nautilus', value: 2},
        {displayName: 'Watchtower', value: 3},
        {displayName: 'Panacea', value: 4},
        {displayName: 'Apollo', value: 5},
        {displayName: 'Soteria', value: 6}
      ]
    },
  ]
  displayedColumns: string[] = [
    'Name',
    'Primary_Site_Contact',
    'CST',
    'Solarwinds',
    'IASO',
    'Mail_Scanning',
    'CEL',
    'Active',
    'Team',
    'Reveiw_Date'
  ];

  originalData: any[] = JSON.parse(JSON.stringify(this.mock.userData.Clients.clients));
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private mock: MockService,private cdref: ChangeDetectorRef ,private service:CommonService) {
    
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.initTable(this.mock.userData.Clients.clients);
    this.cdref.detectChanges();
    this.dataSource.sort = this.sort;
  }
  resetFilter(){
    this.filterModels.forEach((model) => {
      if (model.model!= -1){
        model.model=-1
      }
    })
    this.initTable(this.mock.userData.Clients.clients);
  }

  // sortData(sort: Sort) {
    // const data = this.dataSource.sort
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = this.dataSource;
    // } 
    // else {
    //   this.sortedData = this.dataSource.sort((a:any, b:any) => {
    //     const aValue = a[sort.active];
    //     const bValue = b[sort.active];
    //     return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    //   });
    // }
  // }
  applyFilter() {
    let filteredData!: any[];
    let isAllFilterAny = true;
    this.filterModels.forEach((model) => {
      if (model.model > -1) {
        isAllFilterAny = false;
        filteredData = (filteredData || this.originalData).filter((data) => {
          if (model.modelName === 'gfiId' && model.model) {
            return data[model.modelName] != null;
          }
          if (model.modelName === 'iasoId' && model.model) {
            return data[model.modelName] != null;
          }
          if (model.modelName === 'teamId' && model.model > 0) {
            return data[model.modelName] === model.model;
          }
          return data[model.modelName] === model.model;
        });
      }
    });
    // clear all filters
    if (isAllFilterAny) {
      filteredData = this.originalData;
    }  
    this.excelData=filteredData
    this.initTable(filteredData);
  }
  exportAsCSV() {
    let dataArr=new Array();
    this.excelData = this.excelData==undefined?this.originalData:this.excelData
    this.excelData.forEach((element:any) => {
      dataArr.push({
        'Name': element.name ? element.name : '--',
        'Primary Site Contact': element.isHavingPrimarySiteContact == true ? 'Has Site Contact' : 'No Site Contact',
        'CST': element.isHavingCSTUsers ? 'Has CST'  : 'No CST',
        'Solarwinds': element.gfiId ? element.gfiId : '--',
        'IASO': element.iasoId ? element.iasoId : '--',
        'Mail Scanning': element.iasoId ? element.iasoId : '--',
        'CEL': element.CEL == true ? 'Has CEL' : 'No CEL',
        'Active': element.isActive == true ? 'Active' : 'InActive',
        'Team': element.teamName ? element.teamName : '--',
        'Reveiw Date': element.reviewDate ? element.reviewDate : '--',
      })
    })
    this.service.exportAsExcelFile(dataArr, 'Client Management List')
  }
  private initTable(filteredData: any[]) {
    this.totalClient=filteredData.length
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator
  }
}
