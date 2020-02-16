import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showLogin: boolean;
  loggedUser: User;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLogin = true;
    }, 1);
  }

  userHandler(user: User) {
    this.showLogin = false;

    setTimeout(() => {
      this.loggedUser = user;
    }, 1000);
  }

}
