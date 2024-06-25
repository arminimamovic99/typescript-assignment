import { Component } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      ChatComponent,
      CreateMessageComponent,
      RouterOutlet
  ],
  template: `
    <router-outlet></router-outlet>

  `,
})
export class AppComponent {
  title = 'Chat';
}
