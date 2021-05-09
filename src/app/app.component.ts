import { Component } from '@angular/core';
import { LocalStorageService } from './shared/local-storage.service';
import { Router, ResolveEnd, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ResolveEnd) {
        this.showHead = !(event['url'] === '/login');
      }
    });
  }

  ngOnInit() {}

}