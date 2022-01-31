import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientServices, ServiceTop } from 'src/app/models/service';
import { MockService } from 'src/app/service/mock.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  OwnerName: any
  clienName: any
  servicetype?: string="HAS"
  clientserviceId?: number
  Service_top: ServiceTop[] = JSON.parse(JSON.stringify(this.mockService.service_top.clientServiceTypes))
  originalData: ClientServices[] = JSON.parse(JSON.stringify(this.mockService.service.clientServices));
  dataSource: MatTableDataSource<ClientServices> = new MatTableDataSource<ClientServices>();
  displayedColumns: string[] = [
    'Name',
    'Manager',
    'IT_Support_&_Service_Desk',
    'Managed_Backup',
    'Diaster_Recovery',
    'Business_Continuity',
    'Hosted_Phone_System',
    'Proactive_Monitoring_Servers',
    'Proactive_Monitoring_Desktop',
    'Infrastructure_as_a_Service',
    'Mail_Archiving',
    'Mail_Scanning',
    'Managed_Anti_virus',
    'Web_Security',
    'Patch_management',
    'Connectivity',
    'Software_Rental',
    'Managed_Wireless_Networking',
    'Proactive_Monitoring'
  ];
  constructor(private mockService: MockService) {
  }

  ngOnInit(): void {
    this.initTable(this.originalData);
  }

  resetFilter() {
    this.OwnerName = ''
    this.clienName = ''
    this.servicetype = ''
    this.initTable(this.originalData);
  }

  applyFilter(serviceId?: number) {
    let filteredData!: ClientServices[];
    this.clientserviceId = serviceId
    if (this.servicetype) {
      filteredData = (filteredData || this.originalData).filter(element => {
      return  element.serviceTypes.find(value => {
          if (value.serviceTypeId==serviceId && this.servicetype=='HAS') {
             return value.serviceTypeId
          }
            return !value.serviceTypeId
        })
      })      
    }
    else if (this.clienName) {
      filteredData = (filteredData || this.originalData).filter(data => {
        return data['clientName'].toLowerCase().includes(this.clienName.toLowerCase())
      })
    }
    else if (this.OwnerName) {
      filteredData = (filteredData || this.originalData).filter(data => {
        return (data.managerName!=null? data.managerName :'').toLowerCase().includes(this.OwnerName.toLowerCase())
      })
    }
    else {
      filteredData = this.originalData
    }
    this.initTable(filteredData)
  }

  private initTable(filteredData: ClientServices[]) {
    this.dataSource = new MatTableDataSource(filteredData);
  }
}
