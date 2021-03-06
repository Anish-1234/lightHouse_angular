import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { NavigationStart, Router } from '@angular/router';
interface SideBarNode {
  name: string;
  link: string;
  icon: string;
  children?: SideBarNode[];
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
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuState: any;
  events: string[] = [];
  activeLink: string = '';
  opened: boolean = true;
  TREE_DATA: SideBarNode[] = [
    { name: 'Launchpad', link: 'share/launchpad', icon: 'fa-rocket' },
    { name: 'Dhasboard', link: 'share/dashboard', icon: 'fa-tachometer' },
    {
      name: 'CRM',
      link: 'share/crm/client-list',
      icon: 'fa-building',
      children: [
        { name: 'Clients', link: 'share/crm/client-list', icon: 'fa-building' },
        { name: 'Users', link: 'share/crm/user-list', icon: 'fa-user' },
        { name: 'Managers', link: 'share/crm/managers', icon: 'fa-users' },
        { name: 'Client Services', link: 'share/crm/services', icon: 'fa-bars' },
        { name: 'Service Descriptions', link: 'share/crm/service-description', icon: 'fa-bars' },
        { name: 'Maintenance Windows', link: 'share/crm/maintenance-window', icon: 'fa-clock-o' },
        { name: 'Removed Devices', link: 'share/crm/removed-devices', icon: 'fa-desktop' }]
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
  private _transformer = (node: SideBarNode, level: number) => {
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
    this.activeLink = link
    this.router.navigate([link])
  }

  getNodeClass(node: any) {
    let cls = '';
    if (node.level === 0) {
      // parent node
      cls = 'parent '
      if (node.link === this.activeLink) {
        cls += 'active';
      } else {
        cls += 'inactive';
      }
    } else {
      cls = 'child '
      // child node
      if (node.link === this.activeLink) {
        cls += 'active';
      } else {
        cls += 'inactive';
      }
    }    
    return cls;
  }
}
