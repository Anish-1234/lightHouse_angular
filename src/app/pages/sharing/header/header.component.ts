import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuState = new EventEmitter();
  showMenu:boolean = true; /* false by default, since hidden */
  tickets:string[]=['item1','item2'];
  notification:string[]=['item1','item2'];
  profile:string[]=['item1','item2'];
  constructor() { }

  ngOnInit(): void {
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }

}
