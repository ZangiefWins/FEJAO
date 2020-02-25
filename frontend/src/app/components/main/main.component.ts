import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChallengeService } from '../../services/challenge.service';
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
  selectedQueue: string;
  loggedUser: User;
  users: Array<User> = [];
  hubConnection : HubConnection;

  constructor(
    private userService : UserService,
    private challengeService : ChallengeService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLogin = true;
    }, 1);

    this.connectToSignalR();
    this.subscribeToServices();
  }

  connectToSignalR() {
    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/echo").build();
    this.hubConnection
      .start()
      .then(() => console.log("Main connection started!"))
      .catch(err => console.log("Error: " + err));

    this.hubConnection.on("Send", (user : User) => {
      this.users.push(user);
    });

    this.hubConnection.on("SendChallenge", (user : User) => {
      this.challengeService.sendIncomingChallenger(user);
    });
  }

  subscribeToServices() {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        let now = moment();
        let userLastUpsate = moment(user.lastUpdate);
        let differenceInDays = now.diff(userLastUpsate, "days");
        
        if (differenceInDays < 1) {
          this.users.push(user);
        } else {
          this.userService.deleteUser(user).subscribe();
        }
      });
    });

    this.challengeService.sendChallenge$.subscribe((user) => {
      this.echoChallenge(user);
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

  echoChallenge(challengedUser : User) {
    this.hubConnection.invoke("EchoChallenge", challengedUser.connectionId, this.loggedUser);
  }

}
