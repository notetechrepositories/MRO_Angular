import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor() { }
    getProductsData() {
        return [
          { Name: 'Report A', Category:'test1',Date:'10/02/2022',Time:'02:30 PM' },
          { Name: 'Report B', Category:'test2',Date:'10/02/2022',Time:'02:30 PM' },
          { Name: 'Report C', Category:'test',Date:'10/02/2022',Time:'02:30 PM' },
          { Name: 'Report D', Category:'test',Date:'10/02/2022',Time:'02:30 PM' },
          { Name: 'Report E', Category:'test',Date:'10/02/2022',Time:'02:30 PM' },
          { Name: 'Report F', Category:'test',Date:'10/02/2022',Time:'02:30 PM' }
        ]
      }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
};
