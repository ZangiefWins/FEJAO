import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() loggedUser : User;

  allBeans : Array<Array<string>> = new Array<Array<string>>();

  constructor() { }

  ngOnInit() {
    this.defineBeanArrays();
  }

  defineBeanArrays() {
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * 20) + 1;

      let beanArray = new Array<string>();

      for (let i = 0; i < random; i++) {
        beanArray[i] = "BEAN";
      }

      this.allBeans[i] = beanArray;
    }
  }

}
