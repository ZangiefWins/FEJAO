import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-versus-bar',
  templateUrl: './versus-bar.component.html',
  styleUrls: ['./versus-bar.component.scss']
})
export class VersusBarComponent implements OnInit {

  @Input() loggedUser : string;

  constructor() { }

  ngOnInit() {
  }

}
