import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showLogin: boolean;
  loggedUser: string;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showLogin = true;
    }, 1);
  }

  usernameHandler(username) {
    this.showLogin = false;

    setTimeout(() => {
      this.loggedUser = username;
    }, 1000);
  }

}
