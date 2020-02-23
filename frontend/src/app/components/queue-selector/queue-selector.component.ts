import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-queue-selector',
  templateUrl: './queue-selector.component.html',
  styleUrls: ['./queue-selector.component.scss']
})
export class QueueSelectorComponent implements OnInit {

  @Output() selectedQueueEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitQueueSelection(queueType) {
    this.selectedQueueEmitter.emit(queueType);
  }

}
