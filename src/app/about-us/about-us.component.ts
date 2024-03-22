import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  action :string ='view';
  fake_name:string ='aboutUs';
  pgm_id:string ='0';
 
  companyName:string;
  address:string;
  phone:string;
  email:string
  aboutUs:string;
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.ds.getAboutUs(this.action,this.fake_name,this.pgm_id).subscribe({
      next: (response)=>{
      if(response.data && response.data.length >0){
        const data = response.data[0].dataDatails[0];
        console.log(data);
        this.companyName = data.t17_company_name
        this.address = data.t17_address_line1
        this.phone = data.t17_company_mobile
        this.email = data.t17_company_email
        this.aboutUs = data.t17_comapany_about_us
      }
    }
      
    })
  }


}
