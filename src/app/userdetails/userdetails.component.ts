import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { office } from '../Model/office';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  status:string='';
  isEnable:boolean=false;
  colType:string="col-md-6"
  @Input()  keyvalueArray: office=new office();
  @Output() changeToTableView = new EventEmitter();

  
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.status = params['create']; 
      if(this.status=='true'){
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
