import { FlatTreeControl } from '@angular/cdk/tree';
import { Component,Input, OnInit, } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
interface FoodNode {
  name: string;
  link:string;
  icon:string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  link:string;
  icon:string;
  level: number;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() menuState: any;
  events: string[] = [];
  opened: boolean = true;
  TREE_DATA: FoodNode[] = [
    {name: 'Launchpad',link:'dashboard',icon:'fa-rocket'},
    {name: 'Dhasboard',link:'dashboard',icon:'fa-tachometer'},
    {
      name: 'CRM',
      link:'client-list',
      icon:'fa-building',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}]
    },
    {
      name: 'Service Desk',
      link:'dashboard',
      icon:'fa-wrench',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}]
    },
    {
      name: 'Client Management',
      link:'dashboard',
      icon:'fa-suitcase',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}]
    },
    {
      name: 'Reporting',
      link:'dashboard',
      icon:'fa-bar-chart',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}],
    },
    {
      name: 'New Business',
      link:'dashboard',
      icon:'fa-id-card',
       children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}],
    },
    {
      name: 'Videos',
      link:'dashboard',
      icon:'fa-file-video-o',
       children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}],
    },
    {
      name: 'Admin',
      link:'dashboard',
      icon:'fa-cogs',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}],
    },
    {
      name: 'Useful info',
      link:'dashboard',
      icon:'fa-info-circle',
      children: [{name: 'item1',link:'dashboard',icon:''}, {name: 'item2',link:'dashboard',icon:''}, {name: 'item3',link:'dashboard',icon:''}],
    },
  ];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      link: node.link,
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
  ngOnChanges(){
    this.opened = this.menuState;
  }
  navigateLink(link:any){
     this.router.navigate([`Share/${link}`])
  }
}
