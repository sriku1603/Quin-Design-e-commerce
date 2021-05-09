import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setStorageData(type, data) {
    localStorage.setItem(type, JSON.stringify(data));
  }

  getStorageData(type): any {
    return JSON.parse(localStorage.getItem(type));
  }
}
