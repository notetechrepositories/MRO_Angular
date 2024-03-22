import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { TransformerUpdates } from '../transformer-updates';
import { TransformerData } from '../transformer-data';
import { MenuData } from '../MenuData';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  customers!: TransformerUpdates[];
  dynamicLink: string = 'transformer';
  data: any;
  options: any;
  cardVisible: boolean = true;
  sourceProducts!: TransformerData[];
  items!: string[];
  targetProducts!: TransformerData[];
  userId: string;
  UserName: string;
  webOrApp: string = 'jxIMqe416ulhwa2yrfMg7g==';
  action: string = 'view';
  fakeName: string = 'menu';
  programId: string = '0';
  menuDatas: any []= []
  constructor(private ds: DataService) { }
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--#123456');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          type: 'line',
          label: 'Inspection',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Measurements',
          backgroundColor: documentStyle.getPropertyValue('--#123456-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: '#123456',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Maintenance',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],

    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
    this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    this.getMenuDetails();
  }
  closeCard() {
    this.cardVisible = false;
  }
  getMenuDetails() {
    this.userId = localStorage.getItem('UserId');
    this.ds.getMenu(this.userId, this.webOrApp, this.action, this.fakeName, this.programId).subscribe({
      next: (response) => {
        this.menuDatas = response.data[0].menuList;
        console.log(this.menuDatas);
        
      },
      error: (error) => {
        console.error('Error fetching menu', error);
      }
    }); 
  }
}