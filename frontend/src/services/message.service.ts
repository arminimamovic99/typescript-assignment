import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IMessage } from '../../../shared/models/message';
interface MessageResponse {
  success: boolean;
  messages: IMessage[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;

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
