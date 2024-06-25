import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../../../shared/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageStateService {
  private messages$ = new BehaviorSubject<IMessage[]>([] as IMessage[]);

  constructor() { }

  getMessages$(): Observable<IMessage[]> {
    return this.messages$;
  }

  emitMessages(messages: IMessage[]) {
    this.messages$.next(messages);
  }
}
