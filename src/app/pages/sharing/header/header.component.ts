import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuState = new EventEmitter();
  showMenu:boolean = true; /* false by default, since hidden */

  constructor() { }

  ngOnInit(): void {
  }
  toggleMenu() {
    console.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }

}
