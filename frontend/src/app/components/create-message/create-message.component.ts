import { NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Message } from "../../../message";
import { MessageService } from "../../../services/message.service";
import { MessageComponent } from "../message/message.component";
import { MessageStateService } from "../../../services/message-state.service";

@Component({
  selector: 'app-create-message',
  standalone: true,
  providers: [MessageService, MessageStateService],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MessageComponent,
    NgIf,
    NgClass,
  ],
  template: `
    <div *ngIf="!message.empty()">
      <app-message [message]="message" no="preview"></app-message>
    </div>
    <form (ngSubmit)="onSubmit()">
      <label class="mt-4">
        <div>Write Message</div>
        <textarea class="block w-full" required name="text" [(ngModel)]="message.text"></textarea>
      </label>

      <button type="submit"
          [disabled]="message.status === 'pending'"
          class="pointer bg-blue-400 py-2 px-4 mt-2 w-full"
          [ngClass]="{'bg-gray-400': message.status === 'pending'}"
      >Send</button>
    </form>
  `,
  styles: ``
})
export class CreateMessageComponent {
  message: Message = new Message('', 'draft');
  private messageService = inject(MessageService);
  private messageStateService = inject(MessageStateService);

  async onSubmit() {
    // refactor this function to use a servie method
      this.message.status = 'sent';
      // const res = await fetch('http://127.0.0.1:3000/messages/send', {
      //   method: 'GET',
      //   body: JSON.stringify({text: this.message.text}),
      // });
      // res.status === 204 ? this.message.status = 'sent' : this.message.status = 'failed';
      this.messageStateService.emitMessages([this.message]);
  }
}
