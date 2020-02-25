import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { ChallengeAcceptance } from '../models/ChallengeAcceptance';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  sendChallenge$: Observable<any>;
  private sendChallengeSubject = new Subject<any>();

  challenger$: Observable<any>;
  private incomingChallengerSubject = new Subject<any>();

  challengeAcceptance$: Observable<any>;
  private challengeAcceptanceSubject = new Subject<any>();

  challengeConfirmation$: Observable<any>;
  private challengeConfirmationSubject = new Subject<any>();

  constructor() {
    this.sendChallenge$ = this.sendChallengeSubject.asObservable();
    this.challenger$ = this.incomingChallengerSubject.asObservable();
    this.challengeAcceptance$ = this.challengeAcceptanceSubject.asObservable();
    this.challengeConfirmation$  = this.challengeConfirmationSubject.asObservable();
  }

  sendChallenge(user : User) {
    this.sendChallengeSubject.next(user);
  }

  sendIncomingChallenger(user : User) {
    this.incomingChallengerSubject.next(user);
  }

  challengeAcceptance(user : User, acceptance: boolean) {
    let challengeAcceptance: ChallengeAcceptance = new ChallengeAcceptance(user, acceptance);

    this.challengeAcceptanceSubject.next(challengeAcceptance);
  }

  challengeConfirmation(challengeAcceptance : ChallengeAcceptance) {
    this.challengeConfirmationSubject.next(challengeAcceptance);
  }
}
