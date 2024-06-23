import { NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IMessage, Message } from "../../../message";
import { MessageService } from "../../../services/message.service";
import { MessageComponent } from "../message/message.component";
import { MessageStateService } from "../../../services/message-state.service";
import { switchMap, tap } from "rxjs";

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MessageComponent,
    NgIf,
    NgClass,
  ],
  templateUrl: './create-message.component.html',
  styles: ``
})
export class CreateMessageComponent {
  message: IMessage = {
    status: 'draft',
    text: ''
  };
  private messageService = inject(MessageService);
  private messageStateService = inject(MessageStateService);

  constructor() {}

  ngOnInit() {
    this.messageStateService.getMessages$().subscribe((msgs3) => console.log({msgs3}))
  }

  async onSubmit() {
    // refactor this function to use a servie method
      this.message.status = 'sent';
      // const res = await fetch('http://127.0.0.1:3000/messages/send', {
      //   method: 'GET',
      //   body: JSON.stringify({text: this.message.text}),
      // });
      // res.status === 204 ? this.message.status = 'sent' : this.message.status = 'failed';
      this.messageService.createMessage(this.message)
        .pipe(
          tap((mesRes) => {console.log({mesRes})}),
          switchMap(() => this.messageService.getMessages()),
          tap((response) => this.messageStateService.emitMessages(response.messages))
        ).subscribe();
     // this.messageStateService.emitMessages([this.message]);
  }
}
