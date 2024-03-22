import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, map, take, timer } from 'rxjs';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [DatePipe]
})
export class ForgotpasswordComponent implements OnInit {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  encryptedData: string;
  time: string;
  otp: string;
  mobileNumber: string;
  pin: string = '';
  newPassword: string = '';
  password2: string = '';
  cardVisibile1: boolean = true;
  cardVisibile2: boolean = false;
  countDown: number = 0;
  currentTime: Date;
  dateTime: Date;
  private subscription: Subscription;
  timeDifference: number;
  email: string;
  otpvalue: boolean = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  invaildotp: boolean = false;
  iserror: boolean = false;
  public hidePassword = true;
  @Output() myEvent = new EventEmitter();

  constructor(private route: Router, private ds: DataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.cardVisibile1 = true;
    var mobilenumber1 = localStorage.getItem('mobileNumber');
    console.log(mobilenumber1);

    if (mobilenumber1 != null) {
      this.startCountDown();
    }

  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  back() {
    this.route.navigateByUrl('');
  }
  passwordFormControl = new FormControl('', [
    Validators.required,

    Validators.pattern(/^[0-9]{4,4}$/)

  ]);


  validate() {
    this.otp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
    this.encryptedData = localStorage.getItem('encryptedData');

    this.ds.getOtpVerification(this.encryptedData, this.otp).subscribe({
      next: (response) => {
        console.log('Response:', response);
        console.log(response);
        this.otpvalue = true;
        console.log(this.otpvalue);

        if (response === 'Valid OTP') {
          this.cardVisibile1 = false;
          this.cardVisibile2 = true;

        } else {
          this.invaildotp = true;
          console.log(response);
          this.iserror = true;
          console.log('OTP is invalid');
        }
      },
    }

    )
  }
  convertStringToData(dateString): Date {
    const dateParts = dateString.split(" "); // Split date and time
    const dateComponents = dateParts[0].split("/"); // Split date into day, month, and year
    const timeComponents = dateParts[1].split(":");
    const amOrPm = dateParts[2]; // Split time into hours, minutes, and seconds

    console.log(amOrPm);
    
    // Parse the components and create a Date object
    const year = parseInt(dateComponents[2]);
    const month = parseInt(dateComponents[0]) - 1; // Months are 0-based
    const day = parseInt(dateComponents[1]);
    let hours=0;
    if (amOrPm!=''){
      if(amOrPm=='PM') {
        hours= parseInt(timeComponents[0])+12;
      }
      else if(amOrPm=='AM' && timeComponents[0]==0){
         hours = parseInt(timeComponents[0])+1;
      }
      else{
         hours = parseInt(timeComponents[0]);
      }
    }
    else{
       hours = parseInt(timeComponents[0]);
    }
    
    
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2]);
    const date = new Date(year, month, day, hours, minutes, seconds);
    return date;

  }
  onOtpInput(event: any, nextInput?: HTMLInputElement): void {
    const input = event.target;

    // Move to the next input if the current one is filled
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (!nextInput && input.value.length === 1) {
      this.validate();
    }
    else {
      console.log("error");
    }
    if (event.key === "Backspace" && event.target.previousElementSibling) {
      const previous = event.target.previousElementSibling as HTMLInputElement;
      this.iserror = false;
      if (previous) {
        previous.focus();
      }
    }
  }
  startCountDown() {
    
    this.email = localStorage.getItem('email')
    // Assuming you have already stored a date string in localStorage with the key 'time'
    this.time = (localStorage.getItem('time'));
    console.log(this.time);
    this.dateTime = this.convertStringToData(this.time);
    this.currentTime = new Date();
    console.log(this.currentTime);
    console.log(this.dateTime);
    const timeDifferenceInMilliseconds = ((this.currentTime.getTime()) - (this.dateTime.getTime()));
    this.timeDifference = Math.floor(timeDifferenceInMilliseconds / 1000);
    this.countDown =  60 - this.timeDifference;
    this.subscription = timer(0, 1000).pipe(take(60),
      map(() => --this.countDown)
    ).subscribe({
      next: () => {
        if (this.countDown <= 0 && !this.cardVisibile2) {
          Swal.fire({
            title: "OTP Expired",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
               
              `

            },
            confirmButtonText: "Ok",
            cancelButtonText: "Resend",
            showCancelButton: true,

            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutUp
                animate__faster
              `
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigateByUrl('');
            }
            else if (result.dismiss) {
              var mobilenumber = localStorage.getItem('mobileNumber');
              console.log(mobilenumber);

              this.ds.getOtp(mobilenumber).subscribe({
                next: (response) => {
                  console.log(response);
                  if (response.status == 200) {
                    
                    this.startCountDown();

                  }
                  else {



                  }
                }

              })




            }
          });

          this.subscription.unsubscribe();
        }


      }

    });





  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pinUpdation() {
    try {
      if (this.newPassword == '') {
        this.iserror = true;
      }

      if (this.newPassword == this.password2) {
        console.log(this.newPassword);
        console.log(this.password2);


        console.log(this.newPassword == this.password2);

        this.pin = this.newPassword;
        this.mobileNumber = localStorage.getItem('mobileNumber')
        this.ds.userPinUpdate(this.mobileNumber, this.pin).subscribe({
          next: (response) => {
            console.log(response);

            console.log(response.message);
            if (response.status == 200) {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Pin Updated Successfully",
                // title: response.message,
                showConfirmButton: false,
                timer: 1000
              });
              this.route.navigateByUrl('master/dashboard');
            }
          }
        }
        )
      }
      else {


      }
    }
    catch {

    }

  }

  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (pw == cpw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }
  displayErrorMessage: boolean = true;
  checkValidity1(event: any) {
    this.iserror = false;
    const keyCode = event.keyCode;

    if (this.newPassword == '') {
      console.log(this.newPassword);

      this.iserror = true;
    }
    if (keyCode == 13) {


      this.displayErrorMessage = this.passwordFormControl.invalid &&
        (this.passwordFormControl.dirty || this.passwordFormControl.touched);
      if (!this.displayErrorMessage) {
        this.pinUpdation();
      }


    }
    else {


      if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 8 || keyCode === 107) {
        console.log(keyCode);
        this.displayErrorMessage = this.passwordFormControl.invalid &&
          (this.passwordFormControl.dirty || this.passwordFormControl.touched);
      } else {


        this.newPassword = this.newPassword.replace(/\D/g, '');


        event.preventDefault();
      }

    }

  }
}


