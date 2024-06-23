import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { IMessage, Message } from '../../../message';
import { MessageStateService } from '../../../services/message-state.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    MessageComponent,
    AsyncPipe
  ],
  template: `
    <div>
      <div *ngFor="let message of messages$ | async; index as i;">
        <app-message [message]="message" [no]="i"></app-message>
      </div>
    </div>
  `,
})
export class ChatComponent {
  messageService = inject(MessageService)
  messageStateService = inject(MessageStateService);
  messages$: Observable<IMessage[]> = this.messageStateService.getMessages$();

  constructor() {}

  ngOnInit() {
    this.messageService.getMessages()
      .pipe(
        tap((res) => this.messageStateService.emitMessages(res.messages))
      ).subscribe();
  }
}
