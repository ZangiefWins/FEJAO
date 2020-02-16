import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

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

  @Output() usernameEmitter : EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(x => console.log(x));
    this.usernamesInPlay = ['BEAN SAFADINHO'];
  }

  login() {
    let inputEl = (<HTMLInputElement>document.getElementById("username"));
    let username = inputEl.value;
    
    let isValid = this.checkUsername(username);

    if (isValid) {
      this.usernameEmitter.emit(username);
    }
  }

  checkUsername(username) {
    if (username === "") {
      this.showError("Seu nome de usuário não pode ser vazio!");

      return false;
    } else if (username.length > 20) {
      this.showError("Seu nome de usuário não pode exceder 20 caracteres.")
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
