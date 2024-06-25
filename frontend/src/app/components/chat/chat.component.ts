import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageStateService } from '../../../services/message-state.service';
import { Observable, tap } from 'rxjs';
import { IMessage } from '../../../../../shared/models/message';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    MessageComponent,
    AsyncPipe
  ],
  templateUrl: "./chat.component.html"
})
export class ChatComponent {
  messageService = inject(MessageService)
  messageStateService = inject(MessageStateService);
  authService = inject(AuthService);
  messages$: Observable<IMessage[]> = this.messageStateService.getMessages$();

  constructor() {}

  ngOnInit() {
    this.messageService.getMessages()
      .pipe(
        tap({
          next: (res) => this.messageStateService.emitMessages(res.messages),
          error: (err) => {
            console.error(err);
            if (err.code === 403) {
              this.authService.logout();
            }
          }
        })
      ).subscribe();
  }
}
