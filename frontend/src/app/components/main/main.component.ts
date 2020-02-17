import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';

import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showLogin: boolean;
  matchFound: boolean;
  loggedUser: User;
  users: Array<User> = [];
  hubConnection : HubConnection;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLogin = true;
    }, 1);
    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/echo").build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error: " + err));

      this.userService.getUsers().subscribe(users => {
        users.forEach(user => {
          let now = moment();
          let userLastUpsate = moment(user.lastUpdate);
          let differenceInDays = now.diff(userLastUpsate, "days");
          
          if (differenceInDays < 1) {
            this.users.push(user);
          } else {
            this.userService.deleteUser(user);
          }
        });
      });

    this.hubConnection.on("Send", (user : User) => {
      this.users.push(user);
    });

  }

  userHandler(user: User) {
    this.showLogin = false;

    setTimeout(() => {
      this.loggedUser = user;
      this.echo();
    }, 1000);
  }

  echo() {
    this.hubConnection.invoke("Echo", this.loggedUser);
  }

}
