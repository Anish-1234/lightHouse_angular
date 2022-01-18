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
    this.formsubcribe()
    this.getFormsValue()
    // this.dataSource.filterPredicate=(data:any,filter:string):boolean{}
    // console.log(this.clientListForm.value);
  }
  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator 
    // console.log(this.dataSource);
    
  }
  filterData={
    active:true,
    solarwinds:'',
    IASO:'',
    Mail:'',
    CEL:true,
    CST:true,
    site_contact:true,
    roadmaps:'',
    teams:'',
  }
  formsubcribe(){
    
    // this.getFormsValue(filterData)
    this.clientListForm.get('site_contact').valueChanges.subscribe((site_contactValue:any)=>{
      this.filterData.site_contact=site_contactValue=='Has Site Contact'?true:false
      this.dataSource.filter = JSON.stringify(this.filterData);
      // console.log(this.dataSource.filter); 
    })
    this.clientListForm.get('CST').valueChanges.subscribe((CSTValue:any)=>{
      this.filterData.CST=CSTValue=='Has CST'?true:false
      this.dataSource.filter = JSON.stringify(this.filterData);
      // console.log(this.dataSource.filter); 
    })
    this.clientListForm.get('CEL').valueChanges.subscribe((CELValue:any)=>{
      this.filterData.CEL=CELValue=='Has CEL'?true:false
      this.dataSource.filter = JSON.stringify(this.filterData);
      // console.log(this.dataSource.filter); 
    })
    // this.clientListForm.get('active').valueChanges.subscribe((activeValue:any)=>{
    //   activeValue=='Active'?true:false
    //   // this.clientListForm.setValue({active:activeValue=='Active'?true:false})
    //   this.dataSource.filter = JSON.stringify(activeValue);
    //   console.log(this.dataSource); 
    // })
    this.clientListForm.get('teams').valueChanges.subscribe((teamValue:any)=>{
      // filterData.active=activeValue=='Active'?true:false
      this.dataSource.filter = teamValue;
      console.log(this.dataSource.filter); 
    })
  }
  
  getFormsValue() {
    this.dataSource.filterPredicate = (data:any, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      console.log(filter);
      
      // let isPositionAvailable = false;
      // if (searchString.position.length) {
      //   for (const d of searchString.position) {
      //     if (data.position.trim() === d) {
      //       isPositionAvailable = true;
      //     }
      //   }
      // } else {
      //   isPositionAvailable = true;
      // }
      const resultValue =
        // isPositionAvailable &&
        // data.active
        // .toString()
        // .trim()
        // .toLowerCase()
        // .indexOf(searchString.active.toLowerCase()) !== -1
        data.isActive==searchString.active
        // data.site_contact
        //   .toString()
        //   .trim()
        //   .toLowerCase()
        //   .indexOf(searchString.site_contact.toLowerCase()) !== -1 &&
        // data.CST
        //   .toString()
        //   .trim()
        //   .toLowerCase()
        //   .indexOf(searchString.CST.toLowerCase()) !== -1 &&
        // data.CEL
        //   .toString()
        //   .trim()
        //   .toLowerCase()
        //   .indexOf(searchString.CEL.toLowerCase()) !== -1;

      return resultValue;
    };
    this.dataSource.filter = JSON.stringify(this.filterData);
  }
  filter(value:any){
    // alert(value)
    
    // const filterData={
    //   active:this.clientListForm.value.active=='Active'?true:'',
    //   solarwinds:this.clientListForm.value.solarwinds,
    //   IASO:this.clientListForm.value.IASO,
    //   Mail:this.clientListForm.value.Mail,
    //   CEL:this.clientListForm.value.CEL=='Has CEL'?true:'',
    //   CST:this.clientListForm.value.CST=='Has CST'?true:'',
    //   site_contact:this.clientListForm.value.site_contact=='Has Site Contact'?true:'',
    //   roadmaps:this.clientListForm.value.roadmaps,
    //   teams:this.clientListForm.value.teams
    // }
    // this.clientListForm.subscribe((value:any)=>{
      //   console.log(value);
      //   const filter = {...value, name: value.name.trim().toLowerCase()} as string;
      
      // })
      // this.dataSource.filter = JSON.stringify(this.clientListForm.value.CEL=='Has CEL'?false:'')
      switch (value) {
        case 'active':
          // const active=this.clientListForm.value.active=='Acitve'?'true':'false'
          // this.dataSource.filter=this.clientListForm.value.active=='Acitve'?'true':'false'
        
        break;

        case 'site_contact':
          // const active=this.clientListForm.value.active=='Acitve'?'true':'false'
          // this.dataSource.filter=JSON.stringify(this.clientListForm.value.site_contact=='Has Site Contact'?true:false)
        // alert(this.clientListForm.value.site_contact=='Has Site Contact'?'true':'false')
        // console.log(this.dataSource.filter);
         this.dataSource.filteredData.filter((element:any)=>{
           if(element.isHavingPrimarySiteContact==true){
            this.dataSource.filter='true'
            // console.log(element.isHavingPrimarySiteContact);
           }
         })
    // this.dataSource.filter = JSON.stringify(filterData)
    // console.log(this.dataSource.filteredData.filter((element:any)=>{
      
    // })
        break;
        
        case 'teams':
          // const active=this.clientListForm.value.active=='Acitve'?'true':'false'
          this.dataSource.filter=this.clientListForm.value.teams
        // alert(this.clientListForm.value.teams)
        // console.log(this.dataSource);
        
        break;
    
      default:
        break;
    }
    // this.dataSource.filteredData.filter((element:any)=>{
    //   // console.log(element);
    //   element.active=this.clientListForm.value.active=='Active'?true:false
    //   // this.dataSource.filter=element.CEL
      
    // })
    // this.dataSource.filteredData.filter()
    // this.dataSource.filter = JSON.stringify(filterData)
    // console.log(this.dataSource.filteredData.filter((element:any)=>{
      
    // })
  }
  // handlePageEvent(event: PageEvent) {
  //   this.length = event.length;
  //   this.pageSize = event.pageSize;
  //   this.pageIndex = event.pageIndex;
  // }
}
