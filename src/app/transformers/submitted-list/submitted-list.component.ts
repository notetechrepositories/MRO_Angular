import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';

@Component({
  selector: 'app-submitted-list',
  templateUrl: './submitted-list.component.html',
  styleUrls: ['./submitted-list.component.css']
})
export class SubmittedListComponent implements OnInit {
  isActive: boolean=true;
  notActive: boolean=false;
  // status: string='active';
  customers!: Customer[];

 
 
  constructor() { }

  ngOnInit(): void {
    this.customers = [
      {
        Updates: 'Updates',
        UpdatedDate: ' 1-1-2014',
        UpdatedBy: 'Sunny leo',
        Location: 'kochi 682107',
        SerialNo: 24401,
        Type: 'css',
        Status:'pending',
      },
      {
        Updates: 'Updates',
        UpdatedDate: ' 1-2-2014',
        UpdatedBy: 'Binoy',
        Location: 'kochi 682107',
        SerialNo: 24402,
        Type: 'pi-map-marker',
        Status:'pending',
      },
      {
        Updates: 'Created',
        UpdatedDate: ' 19-10-2015',
        UpdatedBy: 'Raj',
        Location: 'kochi 682107',
        SerialNo: 24403,
        Type: 'pi-map-marker',
        Status:'pending',
      },
      {
        Updates: 'Updates',
        UpdatedDate: ' 6-9-2016',
        UpdatedBy: 'Diya',
        Location: 'kochi 682107',
        SerialNo: 24404,
        Type: 'pi-map-marker',
        Status:'pending',
      },
      {
        Updates: 'Created',
        UpdatedDate: ' 10-12-2020',
        UpdatedBy: 'Alex',
        Location: 'kochi 682107',
        SerialNo: 24405,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device transfered',
        UpdatedDate: ' 20-9-2023',
        UpdatedBy: 'Alex',
        Location: 'kochi 682107',
        SerialNo: 24406,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device distroyed',
        UpdatedDate: ' 15-3-2002',
        UpdatedBy: 'Gemin',
        Location: 'kochi 682107',
        SerialNo: 24407,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device transfered',
        UpdatedDate: ' 7-8-2023',
        UpdatedBy: 'Abhi',
        Location: 'kochi 682107',
        SerialNo: 24408,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device distroyed',
        UpdatedDate: ' 26-6-2024',
        UpdatedBy: 'Virad',
        Location: 'kochi 682107',
        SerialNo: 24409,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device distroyed',
        UpdatedDate: ' 28-5-2020',
        UpdatedBy: 'Bibin',
        Location: 'kochi 682107',
        SerialNo: 24410,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 8-4-2024',
        UpdatedBy: 'Reshma',
        Location: 'kochi 682107',
        SerialNo: 24411,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Created',
        UpdatedDate: ' 14-6-2019',
        UpdatedBy: 'Rayan',
        Location: 'kochi 682107',
        SerialNo: 24412,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 20-8-2006',
        UpdatedBy: 'Alex',
        Location: 'kochi 682107',
        SerialNo: 24413,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Created',
        UpdatedDate: ' 31-12-2000',
        UpdatedBy: 'Miya',
        Location: 'kochi 682107',
        SerialNo: 24414,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Created',
        UpdatedDate: ' 1-7-2008',
        UpdatedBy: 'Niya',
        Location: 'kochi 682107',
        SerialNo: 24415,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 4-9-2004',
        UpdatedBy: 'kian',
        Location: 'kochi 682107',
        SerialNo: 24416,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 682107',
        UpdatedBy: 'Midhun',
        Location: 'kochi 682107',
        SerialNo: 24417,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 682107',
        UpdatedBy: 'harish',
        Location: 'kochi 682107',
        SerialNo: 24418,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Updates',
        UpdatedDate: ' 682107',
        UpdatedBy: 'Githu',
        Location: 'kochi 682107',
        SerialNo: 24419,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device distroyed',
        UpdatedDate: ' 682107',
        UpdatedBy: 'Aami',
        Location: 'kochi 682107',
        SerialNo: 24420,
        Type: 'pi-map-marker',
        Status:'pending',
      },{
        Updates: 'Device distroyed',
        UpdatedDate: ' 682107',
        UpdatedBy: 'soni',
        Location: 'kochi 682107',
        SerialNo: 24421,
        Type: 'pi-map-marker',
        Status:'pending',
      },
    ];
  }
  
statusColor(customerUpdates:string): object{
    
      
    let styles: object ={};
    switch(customerUpdates)
    {
      case 'Updates':
        styles={
          'color':'blue'
        }; 
        break;
      case 'Created':
        styles={
          'color':'green'
        };
        break;
      case 'Device transfered':
        styles={
          'color':'black'
        };
        break;
      case 'Device distroyed':
          styles={
            'color':'red'
          };
          break;
      default:
        console.log('default');
        break;
    }
    console.log('function ended');
    return styles;
  }
}
