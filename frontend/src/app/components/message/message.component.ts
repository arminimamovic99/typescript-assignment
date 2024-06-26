import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMessage } from '../../../../../shared/models/message';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [
    NgClass,
    DatePipe
  ]
})
export class MessageComponent {
  @Input({ required: true }) message!: IMessage;
}
