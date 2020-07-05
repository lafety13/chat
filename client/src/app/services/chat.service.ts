import {Injectable} from '@angular/core';

import socket from 'socket.io-client';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ChatWsEventsEnum} from '../constants/chat-ws-events.enum';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly SERVER_URL = 'http://localhost:3000/';
  private socket;

  public socketId: Observable<string> = this
    .on(ChatWsEventsEnum.Connect)
    .pipe(
      take(1),
      map(() => this.socket.id)
    );

  connect(): void {
    this.socket = socket(this.SERVER_URL);
  }

  disconnect(close?: any) {
    this.socket.disconnect(close);
  }

  emit(eventName: string, data = null): void {
    this.socket.emit(eventName, data);
  }

  on(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(eventName, (data) => observer.next(data));
    });
  }
}
