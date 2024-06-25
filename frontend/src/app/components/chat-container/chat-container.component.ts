import { Component, inject } from '@angular/core';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [
    CreateMessageComponent,
    ChatComponent
  ],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {
  title = 'Chat app';
  authService = inject(AuthService);

  logoutUser() {
    this.authService.logout();
  }
}
