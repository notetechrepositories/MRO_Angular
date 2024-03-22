import { Component, OnInit } from '@angular/core';
import { permission } from '../Model/permission';
import { heading } from '../Model/heading';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-commonviewtable',
  templateUrl: './commonviewtable.component.html',
  styleUrls: ['./commonviewtable.component.css']
})
export class CommonviewtableComponent implements OnInit {

  products: any[] = [];
  selectedProduct: any;
  filteredProducts: any[] = [];
  circlestatus = false;
  divstatus = false;
  subdivstatus = false;
  boldceo = 'font-weight-bold';
  bolddiv = '';
  boldsubdiv = '';
  boldcircle = '';
  programId = '';
  userId = "1";
  keyvalue: any[] = [];
  fakeName = '';
  levelDisplay = [];

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.programId = params['viewDetails'];

    });
    this.keyvalue = [];
    this.getAlloffice(this.userId);
  }


  selectedProducts: any[] = [];
  addpermission: boolean = false;
  deletepermission: boolean = false;
  permissionInsert: any;
  insertpermisson: permission = new permission();
  setpermission: any[];
  heading: heading = new heading();
  header: any[];
  dupilcatevalue: any[] = [];
  keys: any[] = [];             
  keysArray: any[] = [];
  retrunvalue: any;
  edit(event: any) {
  }
  add() {

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
  preprocessValue(value: string): String {

    this.retrunvalue = '';
    if (value.includes(',')) {
      let retrunvaluesplit = value.split(',');
      for (var i = 0; i < retrunvaluesplit.length; i++) {
        let newstring = '';
        if (i == retrunvaluesplit.length - 1) {
          newstring = retrunvaluesplit[i];
        }
        else {
          newstring = retrunvaluesplit[i] + " , <br>";
        }

        this.retrunvalue = this.retrunvalue + newstring;
      }

    }
    else {
      this.retrunvalue = value

    }


    return this.retrunvalue.toString();
  }
  getAlloffice(userId: string) {

    this.dataservice.getAllOffice(userId, this.programId).subscribe((response) => {
      this.products = response.data[0].dataDetails;
      this.fakeName = response.data[1].fakeName;
      this.insertpermisson = response.data[2].permission[0];
      this.heading = response.data[3].keyArray[0];
      for (var i = 0; i < this.products.length; i++) {

        let value = this.products[i][this.heading.key1]
        let value1 = this.products[i][this.heading.key2]
        let value2 = this.products[i][this.heading.key3]
        let id_parent = this.products[i]["id_parent"]
        let levelName = this.products[i]["level_name"]
        let id = this.products[i]["id"]
        this.keyvalue.push({ "value": value, "value1": value1, "value2": value2, "id_parent": id_parent, "levelName": levelName, "id": id });
        this.keyvalue = [...this.keyvalue]

      }
      this.products = this.keyvalue;
      this.filterProducts('0');
      let levelName = this.filteredProducts[0]["levelName"];
      let id = this.filteredProducts[0]["id_parent"]
      let obj = {
        "levelId": 1,
        "levelName": levelName,
        "id": id,
        "class": "font-weight-bold text-primary",
        "levelNameOld": levelName
      }
      this.levelDisplay.push(obj);

    });

  }
  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }
  selected(selectedProduct: any, option: String) {

    if (option == '') {
      let oldfilterArray = this.filteredProducts;
      this.filterProducts(selectedProduct.id);


      if (this.filteredProducts.length > 0) {
        let length = this.levelDisplay.length;
        if (length > 1) {
          this.levelDisplay[length - 1]["levelName"] = "> " + selectedProduct.value;
        } else {
          this.levelDisplay[length - 1]["levelName"] = selectedProduct.value;
        }

        this.levelDisplay[length - 1]["class"] = "font-weight-bold text-secondary";
        let obj = {
          "levelId": length + 1,
          "levelName": ">" + this.filteredProducts[0].levelName,
          "id": this.filteredProducts[0].id_parent,
          "class": "font-weight-bold ",
          "levelNameOld": this.filteredProducts[0].levelName 
        }
        this.levelDisplay.push(obj)
      }
      else {
        this.filteredProducts = oldfilterArray;
      }

    }
    else {
      this.filterProducts(this.levelDisplay[selectedProduct - 1]['id']);
      while (this.levelDisplay.length > selectedProduct) {
        this.levelDisplay.pop()

      }
      this.levelDisplay[selectedProduct - 1]["class"] = "font-weight-bold  ";
      if (this.levelDisplay.length > 1) {
        this.levelDisplay[selectedProduct - 1]["levelName"] = "> " + option;
      } else {
        this.levelDisplay[selectedProduct - 1]["levelName"] = option;
      }

    }

 
  }
  filterProducts(parentId: string) {
    this.filteredProducts = this.products.filter(product => product.id_parent === parentId);
  }
}
