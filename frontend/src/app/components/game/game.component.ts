import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Bean } from 'src/app/models/Bean';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() loggedUser: User;
  @Input() opponent: User;

  constructor() { }

  ngOnInit() {

  }

}
