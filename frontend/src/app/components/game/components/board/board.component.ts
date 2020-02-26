import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Bean } from 'src/app/models/Bean';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() loggedUser: User;
  @Input() opponent: User;

  board: Array<Array<Bean>> = new Array<Array<Bean>>();

  constructor() { }

  ngOnInit() {
    if (this.loggedUser.id < this.opponent.id) {
      this.defineBeanArrays();
    }
  }

  defineBeanArrays() {
    for (let i = 0; i < 3; i++) {
      let size = this.getArraySize(i);
      this.board[i] = this.generateBeanArray(size, i);
    }
  }

  getArraySize(arrayIndex: number): number {
    let size: number;

    if (arrayIndex == 0) {
      size = this.getRandomArbitrary(5, 21);
    } else if (arrayIndex == 1) {
      do {
        size = this.getRandomArbitrary(5, 21);
      } while (size == this.board[0].length);
    } else if (arrayIndex == 2) {
      do {
        size = this.getRandomArbitrary(5, 21);
      } while (size == this.board[0].length || size == this.board[0].length);
    }

    return size;
  }

  generateBeanArray(size: number, lot: number): Array<Bean> {
    let beanArray: Array<Bean> = [];

    for (let i = 0; i < size; i++) {
      beanArray.push(new Bean(i, this.beanNameGenerator(), lot));
    }

    return beanArray;
  }

  beanNameGenerator(): string {
    return "BEAN";
  }

  //Returns a random number between min (inclusive) and max (exclusive)
  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

}
