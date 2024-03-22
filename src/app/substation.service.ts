import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubstationService {
  add(arg0: { severity: string; summary: string; detail: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getSubstationData() {
    return [
      { Name: 'name A', Location:'test1',Pin:'676529',id:'1' },
      { Name: 'name B', Location:'test2',Pin:'676528',id:'12' },
      { Name: 'name C', Location:'test',Pin:'676522',id:'13' },
      { Name: 'name D', Location:'test',Pin:'676525',id:'14' },
      { Name: 'name E', Location:'test',Pin:'676526',id:'15' },
      { Name: 'name F', Location:'test',Pin:'676521',id:'16' }
    ]
  }
  getSubstation() {
    return Promise.resolve(this.getSubstationData());
}
}
