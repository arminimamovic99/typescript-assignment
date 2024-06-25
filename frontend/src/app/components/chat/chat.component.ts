import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageStateService } from '../../../services/message-state.service';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
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
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css"
})
export class ChatComponent {
  messageService = inject(MessageService)
  messageStateService = inject(MessageStateService);
  authService = inject(AuthService);
  messages$: Observable<IMessage[]> = this.messageStateService.getMessages$()
    .pipe(
      map((array) => {
        return array.sort(function(a,b){
          return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        });
      })
    );

  destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.messageService.getMessages()
      .pipe(
        takeUntil(this.destroy$),
        tap({
          next: (res) => this.messageStateService.emitMessages(res.messages),
          error: (err) => {
            console.error(err);
            if (err.status === 403) {
              this.authService.logout();
            }
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
