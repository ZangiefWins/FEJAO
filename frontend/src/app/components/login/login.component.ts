import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';

import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  users: Array<User> = [];
  error : boolean;
  errorMessage : string;

  public hubConnection : HubConnection;

  @Output() userEmitter : EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/echo").build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error: " + err));

    this.hubConnection.on("Send", (user : User) => {
      this.users.push(user);
    });

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
  }

  login() {
    let inputEl = (<HTMLInputElement>document.getElementById("username"));
    let username = inputEl.value;
    
    let isValid = this.checkUsername(username);

    if (isValid) {
      let user : User = new User(username, "online");

      this.userService.createUser(user).subscribe(createdUser => {
        this.echo(createdUser);
        this.userEmitter.emit(createdUser);
      });
    }
  }

  checkUsername(username) {
    if (username === "") {
      this.showError("Seu nome de usuário não pode ser vazio!");

      return false;
    } else if (username.length > 20) {
      this.showError("Seu nome de usuário não pode exceder 20 caracteres.");

      return false;
    } else if (this.usernameIsInPlay(username)) {
      this.showError("Este nome de usuário já existe.");

      return false;
    }

    return true;
  }

  usernameIsInPlay(username): boolean {
    this.users.forEach(user => {
      if (user.name == username) {
        return true;
      }
    });

    return false;
  }

  showError(errorMessage) {
    this.error = true;
    this.errorMessage = errorMessage;

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  echo(createdUser : User) {
    this.hubConnection.invoke("Echo", createdUser);
  }

}
