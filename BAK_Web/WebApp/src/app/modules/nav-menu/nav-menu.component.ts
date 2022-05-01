import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/auth.service";
import { User, Role } from '../../interfaces/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: User = new User;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }


  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
  }

  isUserAdmin() {
    return this.currentUser.roles.find(x => x === Role.Admin) != null;
  }

  isUserTeacher() {
    return this.currentUser.roles.find(x => x === Role.Teacher) != null;
  }

  isUserStudent() {
    return this.currentUser.roles.find(x => x === Role.Student) != null;
  }
}
