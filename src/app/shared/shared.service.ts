import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  cartSubject = new BehaviorSubject<any>({});

  constructor() { }

  editCartData(productObj, typeOfAction) {
    this.cartSubject.next({type: typeOfAction, obj: productObj});
  }

  getCartData() {
    return this.cartSubject.asObservable();
  }
}
