import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-match-making',
  templateUrl: './match-making.component.html',
  styleUrls: ['./match-making.component.scss']
})
export class MatchMakingComponent implements OnInit {

  @Input() loggedUser : User;
  @Input() users : Array<User>;
  @Input() selectedQueue: String;

  constructor() { }

  ngOnInit() {

  }

}
