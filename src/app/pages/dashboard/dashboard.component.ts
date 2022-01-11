import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  mybreakpoint ?: number;
  mybreakpointheight?:string;
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    
  ];
  
  opportunities:string[] =['Client/Name', 'Total_Profit', 'Status']
  toDoList:string[]=['Client','To_Do_Date']
  clientCall:string[]=['Client','Last_Conversation_Date']
  recentConversation:string[]=['Client','Spoken_to','Notes','Contacted']
  dataSource = this.ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 3;
    // this.mybreakpointheight = (window.innerHeight<=200)?'wrap':'none';
  }
  handleSize(event:any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
    // this.mybreakpointheight=(event.target.innerHeight<=200)?'wrap':'none'
    }
}
