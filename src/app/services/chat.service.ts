import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message, User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // Socket events
  joinRoom(roomId: string): void {
    this.socket.emit('join-room', roomId);
  }

  sendMessage(data: {
    roomId: string;
    content: string;
    senderId: string;
    messageType?: string;
    replyTo?: string;
  }): void {
    this.socket.emit('send-message', data);
  }

  onMessage(): Observable<Message> {
    return new Observable(observer => {
      this.socket.on('receive-message', (data: Message) => observer.next(data));
    });
  }

  startTyping(data: { roomId: string; userId: string; userName: string }): void {
    this.socket.emit('typing', data);
  }

  stopTyping(data: { roomId: string; userId: string }): void {
    this.socket.emit('stop-typing', data);
  }

  onTyping(): Observable<{ userId: string; userName: string }> {
    return new Observable(observer => {
      this.socket.on('user-typing', (data) => observer.next(data));
    });
  }

  onStopTyping(): Observable<{ userId: string }> {
    return new Observable(observer => {
      this.socket.on('user-stop-typing', (data) => observer.next(data));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}