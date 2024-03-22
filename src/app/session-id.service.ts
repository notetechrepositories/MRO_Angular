import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionIdService {

  private storageKey = 'uniqueId';

  getUniqueId(): string {
    const storedId = localStorage.getItem(this.storageKey);

    if (!storedId) {
      const newId = uuidv4();
      localStorage.setItem(this.storageKey, newId);
      return newId;
    }

    return storedId;
  }

  resetUniqueId(): void {
    localStorage.removeItem(this.storageKey);
  }
}
