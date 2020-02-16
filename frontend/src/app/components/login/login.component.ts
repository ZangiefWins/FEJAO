import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : string;
  usernamesInPlay: Array<string>;
  error : boolean;
  errorMessage : string;

  @Output() userEmitter : EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe();
    this.usernamesInPlay = ['BEAN SAFADINHO'];
  }

  login() {
    let inputEl = (<HTMLInputElement>document.getElementById("username"));
    let username = inputEl.value;
    
    let isValid = this.checkUsername(username);

    if (isValid) {
      let user : User = new User(username, "online");

      this.userService.createUser(user).subscribe(createdUser => {
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
    }else if (this.usernamesInPlay.includes(username)) {
      this.showError("Este nome de usuário já existe.");

      return false;
    }

    return true;
  }

  showError(errorMessage) {
    this.error = true;
    this.errorMessage = errorMessage;

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

}
