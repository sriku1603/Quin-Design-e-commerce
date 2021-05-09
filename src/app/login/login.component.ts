import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail = ''; password = '';

  constructor(private router: Router, private notificationService: NotificationService, 
    private localService: LocalStorageService) { }

  ngOnInit() {
  }

  login() {
    const mailRegExp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (!this.userEmail.match(mailRegExp)) {
      this.notificationService.showNotification('error', 'Please Enter a valid email');
    } else if (this.password.length < 8) {
      this.notificationService.showNotification('error', 'Password must Contain a number and a special character');
    } else {
      this.localService.setStorageData('userInfo', {mail: this.userEmail});
      this.router.navigate(['/products-list']);
    }
  }

}
