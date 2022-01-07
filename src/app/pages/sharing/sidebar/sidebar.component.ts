// import { MediaMatcher } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
interface FoodNode {
  name: string;
  link:string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @ViewChild('sidenav', {static : true}) sidebar : TemplateRef<any>;
  events: string[] = [];
  opened: boolean = true;
  TREE_DATA: FoodNode[] = [
    {name: 'Launchpad',link:'dashboard'},
    {name: 'Dhasboard' ,link:'dashboard'},
    {
      name: 'CRM',
      link:'dashboard',
      children: [{name: 'Apple',link:'dashboard'}, {name: 'Banana',link:'dashboard'}, {name: 'Fruit loops',link:'dashboard'}],
    },
    {
      name: 'Service Desk',
      link:'dashboard',
      children: [{name: 'Apple',link:'dashboard'}, {name: 'Banana',link:'dashboard'}, {name: 'Fruit loops',link:'dashboard'}]
    },
    {
      name: 'Client Management',
      link:'dashboard',
      children: [{name: 'Apple',link:'dashboard'}, {name: 'Banana',link:'dashboard'}, {name: 'Fruit loops',link:'dashboard'}]
    },
    {
      name: 'Reporting',
      link:'dashboard',
      children: [{name: 'Apple',link:'dashboard'}, {name: 'Banana',link:'dashboard'}, {name: 'Fruit loops',link:'dashboard'}],
    },
    {
      name: 'New Business',
      link:'dashboard',
      children: [{name: 'Apple', link:'dashboard',}, {name: 'Banana', link:'dashboard',}, {name: 'Fruit loops', link:'dashboard',}],
    },
    {
      name: 'Videos',
      link:'dashboard',
      children: [{name: 'Apple', link:'dashboard',}, {name: 'Banana', link:'dashboard',}, {name: 'Fruit loops', link:'dashboard',}],
    },
    {
      name: 'Admin',
      link:'dashboard',
      children: [{name: 'Apple', link:'dashboard',}, {name: 'Banana', link:'dashboard',}, {name: 'Fruit loops' , link:'dashboard',}]
    },
    {
      name: 'Useful info',
      link:'dashboard',
      children: [{name: 'Apple', link:'dashboard',}, {name: 'Banana', link:'dashboard',}, {name: 'Fruit loops', link:'dashboard',}]
    },
  ];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(public router:Router) {
    this.dataSource.data = this.TREE_DATA;

  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);


  navigateLink(link:any){
     this.router.navigate([`/${link}`])
  }
}
