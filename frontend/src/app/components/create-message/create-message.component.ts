import { NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IMessage} from "../../../../../shared/models/message";
import { MessageService } from "../../../services/message.service";
import { MessageComponent } from "../message/message.component";
import { MessageStateService } from "../../../services/message-state.service";
import { Subject, switchMap, takeUntil, tap } from "rxjs";
import { AuthService } from "../../../services/auth.service";

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
    createdBy: localStorage.getItem('user') as string,
    createdOn: ''
  };
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private messageStateService = inject(MessageStateService);
  showError = false;

  destroy$ = new Subject<void>();

  constructor() {}

  async onSubmit() {
      this.message.status = 'sent';
      this.message.createdOn = new Date().toISOString();
      this.messageService.createMessage(this.message)
        .pipe(
          takeUntil(this.destroy$),
          tap({
            next: () => {
              this.message.status = 'draft';
              this.message.text = '';
            },
            error: (err) => {
              console.error(err);
              if (err.status === 403) {
                this.authService.logout();
              }
            }
          }),
          switchMap(() => this.messageService.getMessages()),
          tap((response) => this.messageStateService.emitMessages(response.messages))
        ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
