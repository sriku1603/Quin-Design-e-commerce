import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo; cartCount = 0; itemsInCart = [];

  constructor(private localService: LocalStorageService, private sharedService: SharedService, 
    private router: Router ) { }

  ngOnInit() {
    this.userInfo = this.localService.getStorageData('userInfo');
    this.sharedService.getCartData().subscribe((res: any) => {
      if (res.type === 'remove') {
        const index = this.itemsInCart.findIndex(x => x.id === res.obj.id);
        if (index >= 0) {
          this.itemsInCart = this.itemsInCart.splice(index, 1);
        }
      } else if (res.type === 'add') {
        let obj = this.itemsInCart.find(x => x.id === res.obj.id);
        if (obj) {
          obj.quantity += 1;
        } else {
          this.itemsInCart.push(res.obj);
        }
      } else if (res.type === 'replace') {
        // this.itemsInCart.
      }
    })
  }

  removeFromCart(item) {
    const index = this.itemsInCart.findIndex(x => x.id === item.id);
    if (index >= 0) {
      if (this.itemsInCart.length === 1) {
        this.itemsInCart = [];
      } else {
        this.itemsInCart = this.itemsInCart.splice(index, 1);
      }
      this.sharedService.editCartData(item, 'remove');
    }
  }

  logOutUser() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}