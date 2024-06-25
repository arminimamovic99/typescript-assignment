import { NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IMessage} from "../../../../../shared/models/message";
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
    text: '',
    createdBy: localStorage.getItem('user') as string
  };
  private messageService = inject(MessageService);
  private messageStateService = inject(MessageStateService);

  constructor() {}

  async onSubmit() {
      this.message.status = 'sent';
      this.messageService.createMessage(this.message)
        .pipe(
          tap(() => {
            this.message.status = 'draft';
            this.message.text = '';
          }),
          switchMap(() => this.messageService.getMessages()),
          tap((response) => this.messageStateService.emitMessages(response.messages))
        ).subscribe();
  }
}
