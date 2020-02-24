import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-list-row',
  templateUrl: './user-list-row.component.html',
  styleUrls: ['./user-list-row.component.scss']
})
export class UserListRowComponent implements OnInit {

  @Input() users : Array<User>;
  @Input() selectedQueue : string;

  challengedUsers : Array<User> = [];

  constructor() { }

  ngOnInit() {
  }

  challenge(user: User) {
    //tudo deve acontecer dentro do IF, já que se deve desafiar apenas um usuário que
    //não esteja desafiado (salvo quando este recusar)
    if (!this.challengedUsers.includes(user)) {
      this.challengedUsers.push(user);
    }
  }

}
