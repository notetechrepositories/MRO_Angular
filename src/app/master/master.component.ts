import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { SessionIdService } from '../session-id.service';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
  user: User = new User();
  userId: string;
  userDetails: string | undefined;
  webOrApp: string = 'jxIMqe416ulhwa2yrfMg7g==';
  action: string = 'view';
  fakeName: string = 'menu';
  programId: string = '0';
  menuDatas: any[] = [];
  isTokenPresent: boolean = false;
  deviceId: string;
  showQRCode: boolean = false;
  id_t5_m_users: string;

  isSidebarOpen = false;
  
  constructor(private ds: DataService, private route: Router) { }

  ngOnInit(): void {
    this.getUserName();
    this.getMenuDetails();
    
  }
  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  
  getUserName() {
    this.id_t5_m_users = localStorage.getItem('UserId');
    this.ds.getUserDetails(this.id_t5_m_users, this.action, this.fakeName, this.programId).subscribe({
      next: (response) => {
        this.userDetails = response.data[0].dataDatails[0].t5_first_name;
      }
    })
  }


  getMenuDetails() {
    this.userId = localStorage.getItem('UserId');
    this.ds.getMenu(this.userId, this.webOrApp, this.action, this.fakeName, this.programId).subscribe({
      next: (response) => {
        if (response.status == 200 && response.data && response.data.length > 0)
          this.menuDatas = response.data[0].menuList;

      },
      error: (error) => {
        console.error('Error fetching menu', error);
      }
    });

  }
  displayMenu(itemIndex: string): boolean {
    switch (itemIndex) {
      case 'AA':
      case 'AB':
      case 'CA':
      case 'CB':
        return true;
      default:
        return false;
    }
  }
  logOut() {
    this.userId = localStorage.getItem('UserId')
    this.deviceId = localStorage.getItem('deviceId')
    this.ds.postLogOut(this.userId, this.deviceId).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
    localStorage.removeItem('access_token');
    localStorage.removeItem('UserId');
    localStorage.removeItem('first_name');
    localStorage.removeItem('uniqueId');
    localStorage.removeItem('loggedIn');
    this.showQRCode = false;
    this.route.navigate(['/']);

  }
}


