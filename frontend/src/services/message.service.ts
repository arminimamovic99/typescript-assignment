import { Injectable } from '@angular/core';
import { IMessage, Message } from '../message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface MessageResponse {
  success: boolean;
  messages: IMessage[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('user1:password1')
    });
    return this.http.get<MessageResponse>(this.apiUrl, { headers });
  }

  createMessage(payload: IMessage) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('user1:password1')
    });
    return this.http.post(this.apiUrl, payload, {headers})
  }
}
