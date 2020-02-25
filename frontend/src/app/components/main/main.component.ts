import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChallengeService } from '../../services/challenge.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';

import * as moment from 'moment';
import { ChallengeAcceptance } from 'src/app/models/ChallengeAcceptance';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showLogin: boolean;
  matchFound: boolean;
  opponent: User;
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

    this.hubConnection.on("Send", (user: User) => {
      this.users.push(user);
    });

    this.hubConnection.on("SendChallenge", (user: User) => {
      this.challengeService.sendIncomingChallenger(user);
    });

    this.hubConnection.on("SendChallengeAcceptance", (challengeAcceptance: ChallengeAcceptance, user: User) => {
      if (challengeAcceptance.acceptance) {
        this.findOpponent(user);
      } else {
        this.challengeService.challengeConfirmation(challengeAcceptance);
      }
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

    this.challengeService.sendChallenge$.subscribe((user : User) => {
      this.echoChallenge(user);
    });

    this.challengeService.challengeAcceptance$.subscribe((challengeAcceptance : ChallengeAcceptance) => {
      this.echoChallengeAcceptance(challengeAcceptance);

      this.findOpponent(challengeAcceptance.user);
    });
  }

  findOpponent(opponent: User) {
    this.opponent = opponent;
    this.matchFound = true;
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

  echoChallengeAcceptance(challengeAcceptance : ChallengeAcceptance) {
    this.hubConnection.invoke("EchoChallengeAcceptance", challengeAcceptance, this.loggedUser);
  }

}
