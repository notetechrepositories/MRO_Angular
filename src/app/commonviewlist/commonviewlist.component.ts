import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { TransformerData } from '../transformer-data';
import { TransformerSubmitted } from '../transformer-submitted';
import { permission } from '../Model/permission';
import { dataemit } from '../Model/dataemit';
import { heading } from '../Model/heading';

@Component({
  selector: 'app-commonviewlist',
  templateUrl: './commonviewlist.component.html',
  styleUrls: ['./commonviewlist.component.css']

})
export class CommonviewlistComponent implements OnInit {

 
[x: string]: any;


statuses!: SelectItem[];
showFullInfo = true;
selectedProducts: any[] = [];
userId = "1";
officevalue: any[] = [];
programId = '';
dupilcatevalue: any[] = [];
dupilcatevalueNew: any[] = [];
fakeName = '';
keys: any[] = [];
keysArray: any[] = [];
valuesForKey: any[] = [];
keyvalueArray: any;
keyvalue: any[] = [];
relevantData: any;

navigateuser: boolean = false;
navigateoffice: boolean = false;
showFullInfocommon: boolean = false;
keyvalueArray1: any[];
permission: any[] = [];

@Output() officesChanged = new EventEmitter<{ keyvalueArray: any[], permission: permission }>();

constructor(private router: Router,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private dataservice: DataService,
  private route: ActivatedRoute) { 
    
  }

ngOnInit() {
  this.route.params.subscribe(params => {

    this.programId = params['viewDetails'];
    this.keyvalue = [];
    this.getAlloffice(this.userId);

  });

}

onChangeToTableView() {
  this.navigateuser = false;
  this.navigateoffice = false;
  this.showFullInfocommon = false;
  this.showFullInfo = true;
}

add() {
  var url = "master/" + this.fakeName + "/true";
  this.router.navigate([url]);
}

deleteSelectedProducts() {
  console.log(this.selectedProducts);

  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected database configurations?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
    }
  });
}


addpermission: boolean = false;
deletepermission: boolean = false;
permissionInsert: any;
insertpermisson: permission = new permission();
setpermission: any[];
heading: heading = new heading();
header: any[];


getAlloffice(userId: string) {
  this.dataservice.getAllOffice(userId, this.programId).subscribe((response) => {
    console.log(response);

    this.fakeName = response.data[1].fakeName;
    this.dupilcatevalue = response.data[0].dataDetails;
    this.dupilcatevalueNew = response.data[0].dataDetails;
    this.insertpermisson = response.data[2].permission[0];
    this.heading = response.data[3].keyArray[0];

    this.keys = Object.keys(this.dupilcatevalue[0]);
    console.log(this.keys);
    
    this.keysArray = this.keys.slice(0, 3);
    for (var i = 0; i < this.dupilcatevalue.length; i++) {

      let value = this.dupilcatevalue[i][this.heading.key1]
      let value1 = this.dupilcatevalue[i][this.heading.key2]
      let value2 = this.dupilcatevalue[i][this.heading.key3]
      this.keyvalue.push({ "value": value, "value1": value1, "value2": value2 });
      this.keyvalue = [...this.keyvalue]

    }


  });
}
view(event: any) {
  console.log(event);

  this.keyvalueArray = event
  for (var i = 0; i < this.dupilcatevalue.length; i++) {

    let value = this.dupilcatevalue[i][this.heading.key1]
    let value1 = this.dupilcatevalue[i][this.heading.key2]
    let value2 = this.dupilcatevalue[i][this.heading.key3]

    if (value == event.value && value1 == event.value1 && value2 == event.value2) {
      this.keyvalueArray = this.dupilcatevalue[i]
      break;
    }
    else {
      continue;
    }

  }
  this.dataToEmit = {
    keyvalueArray: this.keyvalueArray,
    permission: this.insertpermisson,
    editOrView: "view"
  };
  this.officesChanged.emit(this.dataToEmit);
  console.log(this.keyvalueArray);

  this.showFullInfo = true;

  if (this.fakeName == 'userdetails') {
    this.navigateuser = true;
    this.showFullInfo = false;
    this.navigateoffice = false;
    this.showFullInfocommon = false;
  }
  if (this.fakeName == 'officedetails') {
    this.navigateoffice = true;
    this.navigateuser = false;
    this.showFullInfo = false;
    this.showFullInfocommon = false;
  }
}
test(value: any) {

  this.keyvalue = this.keyvalue.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

}
edit(event: any) {
  console.log(event);


  for (var i = 0; i < this.dupilcatevalue.length; i++) {

    let value= this.dupilcatevalue[i][this.heading.key1];
    let value1= this.dupilcatevalue[i][this.heading.key2];
    let value2= this.dupilcatevalue[i][this.heading.key3];
    if(value==event[0].value && value1 == event[0].value1 && value2==event[0].value2){
      this.keyvalueArray=this.dupilcatevalue[i];
      break;
    }
    else{
      continue;
    }
  }
  this.dataToEmit = {
    keyvalueArray: this.keyvalueArray,
    permission: this.insertpermisson,
    editOrView: "edit"
  };
  this.officesChanged.emit(this.dataToEmit);
  console.log(this.keyvalueArray);

  this.showFullInfo = true;

  if (this.fakeName == 'userdetails') {
    this.navigateuser = true;
    this.showFullInfo = false;
    this.navigateoffice = false;
    this.showFullInfocommon = false;
  }
  if (this.fakeName == 'officedetails') {
    this.navigateoffice = true;
    this.navigateuser = false;
    this.showFullInfo = false;
    this.showFullInfocommon = false;
  }
}
dataToEmit: dataemit = new dataemit();
}
