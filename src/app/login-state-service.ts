import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateServiceService {
  private loginStatus = new BehaviorSubject<boolean>(false);

  setLoginStatus(isLoggedIn: boolean) {
    this.loginStatus.next(isLoggedIn);
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

  constructor() { }
}
