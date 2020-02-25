import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  sendChallenge$: Observable<any>;
  private sendChallengeSubject = new Subject<any>();

  constructor() {
    this.sendChallenge$ = this.sendChallengeSubject.asObservable();
  }

  sendChallenge(user : User) {
    this.sendChallengeSubject.next(user);
  }
}
