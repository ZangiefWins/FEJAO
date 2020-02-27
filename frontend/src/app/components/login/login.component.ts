import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  error : boolean;
  errorMessage : string;

  @Input() users : Array<User>;
  @Input() hubConnection : HubConnection;
  @Output() userEmitter : EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
  }

  login() {
    let inputEl = (<HTMLInputElement>document.getElementById("username"));
    let username = inputEl.value;
    
    let isValid = this.checkUsername(username);

    if (isValid) {
      this.createUser(username);
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
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == username) {
        return true;
      }
    }

    return false;
  }

  showError(errorMessage) {
    this.error = true;
    this.errorMessage = errorMessage;

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  createUser(username : string) {
    this.hubConnection.invoke("GetConnectionId").then((connectionId) => {
      let user : User = new User(username, connectionId);

      this.userService.createUser(user).subscribe(createdUser => {
        this.userEmitter.emit(createdUser);
      });
    });
  }
}
