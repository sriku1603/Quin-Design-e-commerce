import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../shared/local-storage.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  originalProductList = []; displayedProducts = []; cart = []; pageNum = 0; itemsPerPage = 10;
  pageSize = [10, 25, 50, 100]; newProduct = {};

  @ViewChild('addProductModal', { static: false }) addProductModal;
  @ViewChild('deleteProductModal', { static: false }) deleteProductModal;
  addProductModalRef: NgbModalRef;
  deleteProductModalRef: NgbModalRef;

  constructor(private localService: LocalStorageService, private modalService: NgbModal,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.originalProductList = [
      {
        "name": "Test",
        "price": 40,
        "available": true
      },
      {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      }, {
        "name": "Test",
        "price": 40,
        "available": true
      },
    ]
    this.sharedService.getCartData().subscribe((res: any) => {
      if (res.type === 'remove') {
        let obj = this.originalProductList.find(x => x.id === res.obj.id);
        obj.quantity = 0;
      }
    })
    if (this.localService.getStorageData('products')) {
      // this.originalProductList = this.localService.getStorageData('products');
      this.originalProductList = this.originalProductList.map((x, index) => {
        return {
          ...x,
          id: index + 1,
          quantity: 0,
        }
      });
      this.setDisplayingProductList()
    }
  }

  setDisplayingProductList() {
    this.displayedProducts = this.originalProductList.slice((this.pageNum * this.itemsPerPage),
      (this.pageNum * this.itemsPerPage) + this.itemsPerPage);
  }

  deleteProduct(item) {
    const index = this.originalProductList.findIndex(x => x.id === item.id);
    if (index >= 0) {
      this.deleteProductModalRef = this.modalService.open(this.deleteProductModal, { size: 'xl', backdrop: 'static' });
      this.deleteProductModalRef.result.then((result) => {
        if (result === 'success') {
          this.originalProductList = this.originalProductList.splice(index, 1);
          this.localService.setStorageData('products', this.originalProductList);
          this.pageNum = 0;
          this.setDisplayingProductList();
        } else if (result === 'cancel') {
          this.deleteProductModalRef.close();
        }
      }, (reason) => { });
    }
  }

  changePageNum(type) {
    if (type === 'increment') {
      if ((this.pageNum * this.itemsPerPage) < this.originalProductList.length) {
        this.pageNum += 1;
      }
    } else if (type === 'decrement') {
      if (this.pageNum > 1) {
        this.pageNum -= 1;
      }
    }
  }

  addProduct() {
    this.newProduct['name'] = '';
    this.newProduct['price'] = null;
    this.newProduct['image'] = null;
    this.newProduct['available'] = true;
    this.addProductModalRef = this.modalService.open(this.addProductModal, { size: 'lg', backdrop: 'static' });
    this.addProductModalRef.result.then((result) => {
      if (result === 'success') {
        this.originalProductList.push(this.newProduct);
        this.localService.setStorageData('products', this.originalProductList);
        this.pageNum = 0;
        this.setDisplayingProductList();
      } else if (result === 'cancel') {
        this.addProductModalRef.close();
      }
    }, (reason) => { });
  }

  fileChanged(e) {
    let img = e.target.files[0];
    let thisClass = this;
    let reader = new FileReader();
    reader.onloadend = function () {
      thisClass.newProduct['image'] = reader.result;
    }
    reader.readAsDataURL(img);
  }

  cartOperation(type, obj) {
    if (obj.quantity > 0) {
      this.sharedService.editCartData(obj, type);
    }
  }

}
