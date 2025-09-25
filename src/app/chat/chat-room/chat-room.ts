import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  senderAvatar: string;
  timestamp: Date;
  isOwn: boolean;
  messageType: 'text' | 'file' | 'system';
}

interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
}

@Component({
  selector: 'app-chat-room',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatChipsModule,
    MatBadgeModule
  ],
  templateUrl: './chat-room.html',
  styleUrl: './chat-room.css'
})
export class ChatRoom implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  newMessage = '';
  roomName = 'JavaScript Study Group';
  
  messages: ChatMessage[] = [
    {
      id: '1',
      content: 'Hey everyone! Ready for today\'s React session?',
      sender: 'John Doe',
      senderAvatar: 'JD',
      timestamp: new Date(2025, 8, 25, 9, 30),
      isOwn: false,
      messageType: 'text'
    },
    {
      id: '2',
      content: 'Yes! I\'ve been looking forward to learning about hooks.',
      sender: 'You',
      senderAvatar: 'ME',
      timestamp: new Date(2025, 8, 25, 9, 32),
      isOwn: true,
      messageType: 'text'
    },
    {
      id: '3',
      content: 'Sarah Wilson joined the session',
      sender: 'System',
      senderAvatar: 'SY',
      timestamp: new Date(2025, 8, 25, 9, 35),
      isOwn: false,
      messageType: 'system'
    },
    {
      id: '4',
      content: 'Great! I have some examples to share with everyone.',
      sender: 'Sarah Wilson',
      senderAvatar: 'SW',
      timestamp: new Date(2025, 8, 25, 9, 36),
      isOwn: false,
      messageType: 'text'
    },
    {
      id: '5',
      content: 'Should we start with useState or go straight to useEffect?',
      sender: 'Mike Johnson',
      senderAvatar: 'MJ',
      timestamp: new Date(2025, 8, 25, 9, 40),
      isOwn: false,
      messageType: 'text'
    },
    {
      id: '6',
      content: 'Let\'s start with useState to build up the foundation first.',
      sender: 'You',
      senderAvatar: 'ME',
      timestamp: new Date(2025, 8, 25, 9, 42),
      isOwn: true,
      messageType: 'text'
    }
  ];

  onlineUsers: OnlineUser[] = [
    { id: '1', name: 'John Doe', avatar: 'JD', status: 'online' },
    { id: '2', name: 'Sarah Wilson', avatar: 'SW', status: 'online' },
    { id: '3', name: 'Mike Johnson', avatar: 'MJ', status: 'online' },
    { id: '4', name: 'Alex Chen', avatar: 'AC', status: 'away' },
    { id: '5', name: 'Emily Davis', avatar: 'ED', status: 'busy' }
  ];

  private shouldScrollToBottom = false;

  ngOnInit() {
    this.shouldScrollToBottom = true;
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        content: this.newMessage.trim(),
        sender: 'You',
        senderAvatar: 'ME',
        timestamp: new Date(),
        isOwn: true,
        messageType: 'text'
      };

      this.messages.push(message);
      this.newMessage = '';
      this.shouldScrollToBottom = true;
      
      // Focus back on input
      setTimeout(() => {
        this.messageInput.nativeElement.focus();
      }, 100);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'online': return 'radio_button_checked';
      case 'away': return 'schedule';
      case 'busy': return 'do_not_disturb_on';
      default: return 'radio_button_unchecked';
    }
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  trackMessage(index: number, message: ChatMessage): string {
    return message.id;
  }

  trackUser(index: number, user: OnlineUser): string {
    return user.id;
  }
}
