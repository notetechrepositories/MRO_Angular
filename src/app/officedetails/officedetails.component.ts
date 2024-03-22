import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { office } from '../Model/office';
import { ActivatedRoute, Router } from '@angular/router';
import { permission } from '../Model/permission';
import { dataemit } from '../Model/dataemit';

@Component({
  selector: 'app-officedetails',
  templateUrl: './officedetails.component.html',
  styleUrls: ['./officedetails.component.css']
})
export class OfficedetailsComponent implements OnInit {
  isEnable: boolean = false;
  status:string='';
  colType:string="col-md-6"
  keyvalueArray:office;
  permission:permission;
  
  @Input()  dataToEmit: dataemit=new dataemit();
  @Output() changeToTableView = new EventEmitter();
  constructor(private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.keyvalueArray=this.dataToEmit.keyvalueArray;
    this.permission=this.dataToEmit.permission;
    this.route.params.subscribe(params => {
      this.status = params['create']; 
      
      if(this.status=='true' || this.permission.permission_update=='n' || this.dataToEmit.editOrView=='edit'){
        this.isEnable=true;  
        this.colType="col-md-12";
        
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
 back(){
  this.changeToTableView.emit();
 }

}
