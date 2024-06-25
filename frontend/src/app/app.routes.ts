import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { authenticatedGuard } from '../authenticated.guard';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [authenticatedGuard]},
  {path: 'chat', component: ChatContainerComponent, canActivate: [authGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
