import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Bean } from 'src/app/models/Bean';
import { HubConnection } from '@aspnet/signalr';
import { Board } from 'src/app/models/Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() loggedUser: User;
  @Input() opponent: User;
  @Input() hubConnection: HubConnection;

  board: Board = new Board();

  constructor() { }

  ngOnInit() {
    this.hubConnection.on("SendBoard", (board: Board) => {
      this.board = board;
    });

    if (this.loggedUser.id < this.opponent.id) {
      this.defineBeanArrays();
      this.echoBoard();
    }
  }

  defineBeanArrays() {
    for (let i = 0; i < 3; i++) {
      let size = this.getArraySize(i);
      this.board.beanLots[i] = this.generateBeanArray(size, i);
    }
  }

  getArraySize(arrayIndex: number): number {
    let size: number;

    if (arrayIndex == 0) {
      size = this.getRandomArbitrary(5, 21);
    } else if (arrayIndex == 1) {
      do {
        size = this.getRandomArbitrary(5, 21);
      } while (size == this.board.beanLots[0].length);
    } else if (arrayIndex == 2) {
      do {
        size = this.getRandomArbitrary(5, 21);
      } while (size == this.board.beanLots[0].length || size == this.board.beanLots[0].length);
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

  echoBoard() {
    debugger;
    this.hubConnection.invoke("EchoBoard", this.board, this.loggedUser, this.opponent);
  }

  //Returns a random number between min (inclusive) and max (exclusive)
  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

}
