import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { NotificationService } from './services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { NotificationOptions } from './services/NotificationOptions';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgbModule,
    NotifierModule.withConfig(NotificationOptions),
  ],
  exports: [
    HeaderComponent,
    NotifierModule
  ],
  providers: [
    NotificationService
  ]
})
export class CoreModule { }
