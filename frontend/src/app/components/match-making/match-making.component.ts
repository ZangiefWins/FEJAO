import { Component, OnInit, Input } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-match-making',
  templateUrl: './match-making.component.html',
  styleUrls: ['./match-making.component.scss']
})
export class MatchMakingComponent implements OnInit {

  @Input() loggedUser : User;
  @Input() users : Array<User>;

  challengers : Array<User> = [];

  constructor(
    private challengeService : ChallengeService
  ) { }

  ngOnInit() {
    this.subcribeToServices();
  }

  subcribeToServices() {
    this.challengeService.challenger$.subscribe((user) => {
      this.challengers.push(user);
    });
  }
  
  updateChallengeStatus(challenger: User, acceptance: boolean) {
    this.challengeService.challengeAcceptance(challenger, acceptance);

    this.challengers = this.challengers.filter(storedChallenger => storedChallenger !== challenger);
  }

}
