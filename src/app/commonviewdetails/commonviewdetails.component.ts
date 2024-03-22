import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { office } from '../Model/office';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commonviewdetails',
  templateUrl: './commonviewdetails.component.html',
  styleUrls: ['./commonviewdetails.component.css']
})
export class CommonviewdetailsComponent implements OnInit {

  active: boolean = false;
  isEnable: boolean = false;
  status:string='';
  email:string='';
  
  @Input()  keyvalueArray: office=new office();
 @Input()   permission:any;
  @Output() changeToTableView = new EventEmitter();

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

console.log(this.keyvalueArray);
console.log(this.permission);

    this.route.params.subscribe(params => {
      this.status = params['create']; 
      if(this.status=='true'){
        this.isEnable=true;
      }
      else{
        this.status ='false';
        this.isEnable=false;
      }
     
    });
  }

  isEdit() {
    this.isEnable = !this.isEnable;
  }
  officeDetails: any[] = [];

  setOfficeDetails(details: any[]) {
    this.officeDetails = details;
    console.log(this.officeDetails);
    
  }
  

}
