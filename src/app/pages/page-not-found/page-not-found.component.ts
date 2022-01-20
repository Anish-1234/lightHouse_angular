import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="h-100" fxLayout="row" fxLayoutAlign="center center">
    <div class="display-4" fxLayout="row" fxLayoutAlign="center center">Page not found </div>
  </div> `,
  styles: ['']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
