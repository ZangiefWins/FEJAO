import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { ChallengeService } from '../../../../services/challenge.service';
import { ChallengeAcceptance } from 'src/app/models/ChallengeAcceptance';

@Component({
  selector: 'app-user-list-row',
  templateUrl: './user-list-row.component.html',
  styleUrls: ['./user-list-row.component.scss']
})
export class UserListRowComponent implements OnInit {

  @Input() users : Array<User>;
  @Input() loggedUser : User;
  @Input() selectedQueue : string;

  challengedUsers : Array<User> = [];

  constructor(private challengeService : ChallengeService) { }

  ngOnInit() {
    this.subscribeToServices();
  }

  subscribeToServices() {
    this.challengeService.challengeConfirmation$.subscribe((challengeAcceptance: ChallengeAcceptance) => {
      
    });
  }

  challenge(user: User) {
    //tudo deve acontecer dentro do IF, já que se deve desafiar apenas um usuário que
    //não esteja desafiado (salvo quando este recusar)
    if (!this.challengedUsers.includes(user)) {
      this.challengedUsers.push(user);

      this.challengeService.sendChallenge(user);
    }
  }

}
