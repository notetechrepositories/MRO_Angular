import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { TransformerData } from '../transformer-data';
import { TransformerSubmitted } from '../transformer-submitted';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { catchError, Subscription, count, interval, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.css'],
})
export class TransformersComponent implements OnInit {
  header: any;
  transformerData!: TransformerData[];
  transformerSubmit!: TransformerSubmitted[];
  statuses!: SelectItem[];
  showFullInfo = false;
  selectedProducts!: any[];
  userId = "1";
  officevalue: any[] = [];
  @Output() officesChanged = new EventEmitter<any[]>();
  private subscription: Subscription;
  programId = '';
  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dataservice: DataService,
    private route: ActivatedRoute) { }

  addTransformer(value: any) {
    this.router.navigate(['master/viewtransformers/true']);


  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.programId = params['viewDetails'];

      // this.isEdit();
    });
    this.getAlloffice(this.userId);
    this.transformerData = [
      {
        Area: 'Fort Kochi',
        Location: 'kochi 682107',
        SerialNo: 24425,
        Navigation: 'pi-map-marker',
      },
      {
        Area: 'Kaloor',
        Location: 'kochi 682107',
        SerialNo: 24426,
        Navigation: '',
      },
    ];

    this.transformerSubmit = [
      {
        Updates: 'Updated',
        Location: 'kaloor 682107',
        SerialNo: 24425,
        UpdatedBy: 'Prathap hari',
        UpdatedDate: '20/10/2023',
        UpdatedTime: '10:20 AM',
        Type: 'OUTDOOR',
        Status: 'pending',
      },
      {
        Updates: 'Updated',
        Location: 'kochi 682107',
        SerialNo: 24425,
        UpdatedBy: 'Prathap hari',
        UpdatedDate: '10/10/2023',
        UpdatedTime: '10:20 AM',
        Type: 'OUTDOOR',
        Status: 'pending',
      },
      {
        Updates: 'Updated',
        Location: 'kochi 682107',
        SerialNo: 24425,
        UpdatedBy: 'prathap hari',
        UpdatedDate: '02/06/2023',
        UpdatedTime: '10:20 AM',
        Type: 'OUTDOOR',
        Status: 'pending',
      },
      {
        Updates: 'Device Ruined',
        Location: 'kochi 682107',
        SerialNo: 24425,
        UpdatedBy: 'prathap hari',
        UpdatedDate: '02/06/2023',
        UpdatedTime: '10:20 AM',
        Type: 'css',
        Status: 'pending',
      },
      {
        Updates: 'pending',
        Location: 'kochi 682107',
        SerialNo: 24425,
        UpdatedBy: 'prathap hari',
        UpdatedDate: '02/06/2023',
        UpdatedTime: '10:20 AM',
        Type: 'INDOOR',
        Status: 'pending',
      },
    ];
  }

  getUpdateClass(updateStatus: string): string {
    switch (updateStatus) {
      case 'Updated':
        return 'blue-text';
      case 'pending':
        return 'red-text';
      case 'Device Ruined':
        return 'yellow-text';
      default:
        return '';
    }
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter((val)=> !this.selectedProducts?.includes(val));
        // this.selectedProducts = null;
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  dupilcatevalue: any[] = [];
  keys: any[] = [];
  keysArray: any[] = [];
  valuesForKey: any[] = [];
  keyvalueArray: any;
  keyvalue: any[] = [];
  relevantData: any;
  getAlloffice(userId: string) {
    this.dataservice.getAllOffice(userId, "1").subscribe((response) => {
      console.log(response.data);

      this.dupilcatevalue = response.data[0].getOffice;
      this.keys = Object.keys(this.dupilcatevalue[0]);
      this.keysArray = this.keys.slice(0, 3);



      for (var i = 0; i < this.dupilcatevalue.length; i++) {
        let value = null;
        let value1 = null;
        let value2 = null;
        for (var j = 0; j < this.keysArray.length; j++) {

          let keyname = this.keysArray[j];
          let valueForKey = this.dupilcatevalue[i][keyname];

          if (j == 0) {
            value = valueForKey;
          }
          else if (j == 1) {
            value1 = valueForKey;
          }
          else if (j == 2) {
            value2 = valueForKey;
          }

        }
        this.keyvalue.push({ "value": value, "value1": value1, "value2": value2 });


        // this.officesChanged.emit(this.keyvalue[i]);


      }


    });
  }
  view(event: any) {
    this.keyvalueArray = event


    for (var i = 0; i < this.dupilcatevalue.length; i++) {

      var abc = 0;
      for (var j = 0; j < this.keysArray.length; j++) {
        let keyname = this.keysArray[j];

        let valueForKey = this.dupilcatevalue[i][keyname];


        if (j == 0) {
          if (valueForKey == event.value) {
            abc++;
          }
        }
        else if (j == 1) {
          if (valueForKey == event.value1) {
            abc++;
          }
        }
        else if (j == 2) {
          if (valueForKey == event.value2) {
            abc++;
          }
        }

      }
      if (abc == 3) {
        this.keyvalueArray = this.dupilcatevalue[i]
        break;

      }
      else {
        continue;
      }

    }
    this.officesChanged.emit(this.keyvalueArray);
    this.showFullInfo = true;
  }
}
