import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {
  menuState:boolean=true
  constructor() { }

  ngOnInit(): void {
  }
  menuClicked(event:any){
    this.menuState = event;
  }

}
