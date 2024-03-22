import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'chart.js';
import { MenuItem } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  position: string = 'top';
  label: string = '';
  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'create',
        icon: 'bx bx-plus-circle',
        tooltip: 'create'
      },
      {
        label: 'Edit',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
      },
      {
        label: 'Delete',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
      },
      {
        label: 'Download',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
      }
    ];
  }


}
