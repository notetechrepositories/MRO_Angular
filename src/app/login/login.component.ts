import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User[] = [];
  mobileNumber: string;
  pin!: string;
  token!: string;
  webOrApp: string = 'jxIMqe416ulhwa2yrfMg7g==';
  userName: any;
  data: any;
  forgotNumber: string;
  cardVisible: boolean = true;
  card2Visible: boolean = false;
  numberNotRegisterd: boolean = false;
  mobilenumber: string = '';
  action: string = 'view';
  fakeName: string = 'aboutUs';
  programId: string = '0';
  imagePath: string;
  mobile: string;
  visible:boolean=false;
  showQRCode: boolean = false;
  qrCodeValue: string = 'User Specific Value';
  qrDataUrl: string;
  deviceId: string;
  isOpenModal = false;

  displayErrorMessage: boolean = true;
  mobileFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private ds: DataService, private route: Router) {
  }

  ngOnInit(): void {
  }


  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]{10,}$/)
  ]);

  checkValidity(event: any) {
    this.numberNotRegisterd = false;
    const keyCode = event.keyCode;

    if (keyCode == 13) {
      this.displayErrorMessage = this.phoneNumberFormControl.invalid &&
        (this.phoneNumberFormControl.dirty || this.phoneNumberFormControl.touched);
      if (!this.displayErrorMessage) {
        this.submit();
      }
      else {
        this.numberNotRegisterd = false;
      }
    }
    else {
      if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 8 || keyCode === 107 || (event.shiftKey == true && keyCode == 187)) {
        this.displayErrorMessage = this.phoneNumberFormControl.invalid &&
          (this.phoneNumberFormControl.dirty || this.phoneNumberFormControl.touched);
      } else {
        // Prevent the input and hide the input box by setting phoneNumber to an empty string
        this.mobilenumber = this.mobilenumber.replace(/\D/g, '');
        event.preventDefault();
      }
    }
  }

  showDialog() {
    this.visible = true;
}
  login() {
    this.mobileNumber = this.mobile;
    this.deviceId = localStorage.getItem('deviceId');
    this.ds.postUser(this.mobileNumber, this.pin, this.webOrApp, this.deviceId).subscribe({
      next: (response) => {
        let string = JSON.stringify(response);
        if (response.data.access_token && response.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigateByUrl('master/dashboard');
        } else {
          alert("login Failed")
        }

        const token = localStorage.setItem('access_token', response.data.access_token);
        const acesstoken = localStorage.getItem('access_token')
        const decodedToken = jwtDecode(acesstoken);
        this.data = decodedToken;
        const data = localStorage.setItem('UserId', this.data.UserId)
      },
    });

  }
  openModal() {
    this.cardVisible = true;
  }
  closeCard() {
    this.cardVisible = false;
  }


  submit() {
    this.displayErrorMessage = this.phoneNumberFormControl.invalid &&
      (this.phoneNumberFormControl.dirty || this.phoneNumberFormControl.touched);

    if (this.displayErrorMessage) {
      this.numberNotRegisterd = false;

    } else {
      try {
        // Wrap the asynchronous operation in a try block
        this.ds.getOtp(this.mobilenumber).subscribe({
          next: (response) => {
            if (response.status == 200) {


              this.cardVisible = false;
              this.route.navigateByUrl('forgot')

            }
            else {
              this.numberNotRegisterd = true;

            }
          }
        })


        localStorage.setItem("mobileNumber", this.mobilenumber);
      }
      catch (error) {

        console.error('An error occurred:', error);

      }

    }
  }



  parseUserAgent(userAgent: string): { osType: string, osVersion: string } {
    let osType = 'UnknownType';
    let osVersion = 'UnknownVersion';
    const osPartMatch = userAgent.match(/\(([^)]+)\)/);
    let osPart;

    if (osPartMatch) {
      osPart = osPartMatch[1];
    }
    if (osPart && osPart.includes('Windows')) {
      osType = 'Windows';
      const versionMatch = osPart.match(/Windows NT (\d+\.\d+)/);
      if (versionMatch) {
        osVersion = versionMatch[1];
      }
    }
    return { osType, osVersion };
  }

}


