import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/auth.service';
import { User, Role } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  currentUser: User = new User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
