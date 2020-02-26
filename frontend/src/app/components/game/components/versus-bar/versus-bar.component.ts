import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-versus-bar',
  templateUrl: './versus-bar.component.html',
  styleUrls: ['./versus-bar.component.scss']
})
export class VersusBarComponent implements OnInit {

  @Input() loggedUser: User;
  @Input() opponent: User;

  constructor() { }

  ngOnInit() {
  }

}
