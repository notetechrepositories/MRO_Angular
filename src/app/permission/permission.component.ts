import { Component, OnInit } from '@angular/core';
import { permission } from '../Model/permission';
import { heading } from '../Model/heading';
import { DataService } from '../data.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  programId = "6";
  constructor(private dataservice: DataService) { }
  dupilcatevalue: any[] = [];
  fakeName = '';
  userId = "1";
  editableRow: number| null=null;
  rows = [];
  isChecked:boolean=true;
  ngOnInit() {
    this.getAllData(this.userId);

  }
  onCheckboxChange(row: any, key: string, event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion here
    row[key] = input.checked ? 'y' : 'n';
  }

 
  updateRow(values:any ): void {
    console.log(values);
    this.editableRow = null;
  }
  
  setEditableRow(index:number |null): void {
    console.log(index);
    
    this.editableRow = index;
  }

  checking(value: string) {
  }

  clear(table: any) {
    table.clear();
  }
  insertpermisson: permission = new permission();
  setpermission: any[];
  heading: heading = new heading();
  keys: any[] = [];
  keysArray: any[] = [];
  keyvalue: any[] = [];


  duplicatevalueNew: any[] = []  ;
  ischeked: boolean = true;
  getAllData(userId: string) {
    this.dataservice.getAllOffice(userId, this.programId).subscribe((response) => {

      this.fakeName = response.data[1].fakeName;
      this.dupilcatevalue = response.data[0].dataDetails;
      this.duplicatevalueNew = response.data[0].dataDetails;
      this.insertpermisson = response.data[2].permission[0];
      this.heading = response.data[3].keyArray[0];
       this.keys = Object.keys(this.dupilcatevalue[0]);
      this.keysArray = this.keys.slice(0, 3);

      for (var i = 0; i < this.duplicatevalueNew.length; i++) {
        if (this.duplicatevalueNew[i] == 'y') {
          this.ischeked = true;
        }
        else {
          this.ischeked = false;
        }

      }


    });
  }

}
