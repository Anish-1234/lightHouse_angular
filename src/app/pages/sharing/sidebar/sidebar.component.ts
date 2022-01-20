import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
interface FoodNode {
  name: string;
  link: string;
  icon: string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  link: string;
  icon: string;
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
    { name: 'Launchpad', link: 'dashboard', icon: 'fa-rocket' },
    { name: 'Dhasboard', link: 'dashboard', icon: 'fa-tachometer' },
    {
      name: 'CRM',
      link: 'crm/client-list',
      icon: 'fa-building',
      children: [
        { name: 'Clients', link: 'crm/client-list', icon: 'fa-building' },
        { name: 'Users', link: 'crm/user-list', icon: 'fa-user' },
        { name: 'Managers', link: '', icon: 'fa-users' },
        { name: 'Client Services', link: '', icon: 'fa-bars' },
        { name: 'Service Descriptions', link: '', icon: 'fa-bars' },
        { name: 'Maintenance Windows', link: '', icon: 'fa-clock-o' },
        { name: 'Removed Devices', link: '', icon: 'fa-desktop' }]
    },
    {
      name: 'Service Desk',
      link: 'service-desk',
      icon: 'fa-wrench',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }]
    },
    {
      name: 'Client Management',
      link: 'client-list',
      icon: 'fa-suitcase',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }]
    },
    {
      name: 'Reporting',
      link: 'reporting',
      icon: 'fa-bar-chart',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }],
    },
    {
      name: 'New Business',
      link: 'business-list',
      icon: 'fa-id-card',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }],
    },
    {
      name: 'Videos',
      link: 'video',
      icon: 'fa-file-video-o',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }],
    },
    {
      name: 'Admin',
      link: 'admin',
      icon: 'fa-cogs',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }],
    },
    {
      name: 'Useful info',
      link: 'useful-info',
      icon: 'fa-info-circle',
      children: [{ name: 'item1', link: '', icon: '' }, { name: 'item2', link: '', icon: '' }, { name: 'item3', link: '', icon: '' }],
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
  constructor(public router: Router) {
    this.dataSource.data = this.TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.opened = this.menuState;
  }
  navigateLink(link: any) {
    // console.log(`Share/${link}`);
    this.router.navigate([`Share/${link}`])
  }
}
