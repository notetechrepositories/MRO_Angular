import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private ds:DataService) { }
  mobilenumber:string;

  submit(){
    this.ds.getOtp(this.mobilenumber).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 200) {
          const { encryptedData, time, email } = response.data;
        
          localStorage.setItem('encryptedData', encryptedData);
          localStorage.setItem('time', time)
          localStorage.setItem('email', email)



          setTimeout(() => {
            localStorage.removeItem('encryptedData')
            localStorage.removeItem('time')
            localStorage.removeItem('email')
          }, 60000);

            
          
        }
        else {
          
          

        }
      }

    })
    
    
  

  }
}
  

  

