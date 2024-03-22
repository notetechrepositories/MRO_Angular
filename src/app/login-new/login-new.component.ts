import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {interval, Subscription, map, take, timer, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.css'],
  providers: [DatePipe]
})
export class LoginNewComponent implements OnInit, OnDestroy {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  encryptedData: string;
  time :string;
  otp: string;
  mobileNumber: string;
  pin: string = '';
  newPassword: string = '';
  cardVisibile1: boolean = true;
  cardVisibile2: boolean = false;
  countDown: number = 60;
  currentTime: Date;
  dateTime:Date;
  private subscription: Subscription;
  timeDifference: number;
  email:string;
  otpvalue:boolean = false;
  @Output() myEvent = new EventEmitter();
  
  constructor(private route: Router, private ds: DataService,
    private datePipe: DatePipe) { }

  ngOnInit(){
    var mobilenumber1=localStorage.getItem('mobileNumber');
    console.log(mobilenumber1);
    
    if(mobilenumber1 !=null)
    {
      this.startCountDown();
    }
  
  
  }

  back() {
    this.route.navigateByUrl('');
  }

  validate() {
    this.otp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
    this.encryptedData = localStorage.getItem('encryptedData');

    this.ds.getOtpVerification(this.encryptedData, this.otp).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.otpvalue=true;
        console.log(this.otpvalue);
        
        if (response === 'Valid OTP') {
          this.cardVisibile1 = false;
          this.cardVisibile2 = true;

        } else {
          console.log('OTP is invalid');
        }
      },
    }

    )
  }
 
  convertStringToData(dateString):Date{
    const dateParts = dateString.split(" "); // Split date and time
    const dateComponents = dateParts[0].split("-"); // Split date into day, month, and year
    const timeComponents = dateParts[1].split(":"); // Split time into hours, minutes, and seconds

    // Parse the components and create a Date object
    const year = parseInt(dateComponents[2]);
    const month = parseInt(dateComponents[1]) - 1; // Months are 0-based
    const day = parseInt(dateComponents[0]);
    const hours = parseInt(timeComponents[0]);
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
      this.cardVisibile2=true;
      this.cardVisibile1 = false;
      // If there's no next input and the current input is filled,
      // it means we're at the last input of the OTP
      // this.navigateToNextPage();
    }
    if (event.key === "Backspace" && event.target.previousElementSibling) {
      const previous = event.target.previousElementSibling as HTMLInputElement;
      if (previous) {
        previous.focus();
      }
    }
  }
  startCountDown() {
    this.email=localStorage.getItem('email')
    // Assuming you have already stored a date string in localStorage with the key 'time'
   this.time =(localStorage.getItem('time'));
   this.dateTime = this.convertStringToData(this.time);
    this.currentTime= new Date();
    const timeDifferenceInMilliseconds = ((this.currentTime.getTime())-(this.dateTime.getTime()));
    this.timeDifference = Math.floor(timeDifferenceInMilliseconds / 1000);
    this.countDown=60-this.timeDifference;
  

 
      this.subscription = timer(0, 1000).pipe(take(60),
        map(() => --this.countDown)
      ).subscribe({
        next: () => {
          if (this.countDown <= 0 && !this.cardVisibile2  ) {
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
              else if(result.dismiss){
                var mobilenumber=localStorage.getItem('mobileNumber');
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

    this.pin = this.newPassword;
    this.mobileNumber = localStorage.getItem('mobileNumber')
    this.ds.userPinUpdate(this.mobileNumber, this.pin).subscribe({
      next: (response) => {
        if (response.status == 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Pin Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.route.navigateByUrl('/')
        }
      }
    }
    )
  }
}



