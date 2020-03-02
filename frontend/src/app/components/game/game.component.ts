import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Bean } from 'src/app/models/Bean';
import { HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() loggedUser: User;
  @Input() opponent: User;
  @Input() hubConnection: HubConnection;

  firstToPlay: User;

  constructor() { }

  ngOnInit() {
    this.listenToSignalRMethods();

    if (this.loggedUser.id < this.opponent.id) {
      this.determineFirstToPlay();
    }
  }

  determineFirstToPlay() {
    if (Math.random() >= 0.5) {
      this.hubConnection.invoke("EchoFirstToPlay", this.loggedUser, this.opponent);
    } else {
      this.hubConnection.invoke("EchoFirstToPlay", this.opponent, this.loggedUser);
    }
  }

  listenToSignalRMethods() {
    this.hubConnection.on("SendFirstToPlay", (user: User) => {
      this.firstToPlay = user;
    });
  }

}
