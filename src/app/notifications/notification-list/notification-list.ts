import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'session' | 'notes' | 'chat' | 'system';
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  senderName?: string;
  senderAvatar?: string;
}

@Component({
  selector: 'app-notification-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.css'
})
export class NotificationList implements OnInit {
  notifications: Notification[] = [
    {
      id: '1',
      title: 'Session Starting Soon',
      message: 'React Hooks Deep Dive session starts in 15 minutes',
      type: 'session',
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      isRead: false,
      actionUrl: '/sessions',
      senderName: 'System',
      senderAvatar: 'SY'
    },
    {
      id: '2',
      title: 'New File Shared',
      message: 'Sarah Wilson shared "JavaScript ES6 Features.pdf" in your study group',
      type: 'notes',
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      isRead: false,
      actionUrl: '/notes',
      senderName: 'Sarah Wilson',
      senderAvatar: 'SW'
    },
    {
      id: '3',
      title: 'New Message',
      message: 'John Doe: "Has anyone worked with useCallback before?"',
      type: 'chat',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      isRead: true,
      actionUrl: '/chat',
      senderName: 'John Doe',
      senderAvatar: 'JD'
    },
    {
      id: '4',
      title: 'Session Reminder',
      message: 'Don\'t forget: Database Design Workshop tomorrow at 2:00 PM',
      type: 'session',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      isRead: true,
      actionUrl: '/sessions',
      senderName: 'System',
      senderAvatar: 'SY'
    },
    {
      id: '5',
      title: 'Room Invitation',
      message: 'Mike Johnson invited you to join "Full Stack Development" room',
      type: 'system',
      timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
      isRead: true,
      actionUrl: '/rooms',
      senderName: 'Mike Johnson',
      senderAvatar: 'MJ'
    },
    {
      id: '6',
      title: 'File Upload Complete',
      message: 'Your file "React_Component_Patterns.docx" has been uploaded successfully',
      type: 'notes',
      timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
      isRead: true,
      actionUrl: '/notes',
      senderName: 'System',
      senderAvatar: 'SY'
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'session': return 'event';
      case 'notes': return 'description';
      case 'chat': return 'chat';
      case 'system': return 'notifications';
      default: return 'info';
    }
  }

  getNotificationIconClass(type: string): string {
    return `notification-icon-${type}`;
  }

  getNotificationTypeText(type: string): string {
    switch (type) {
      case 'session': return 'Session';
      case 'notes': return 'Notes';
      case 'chat': return 'Chat';
      case 'system': return 'System';
      default: return 'Info';
    }
  }

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
  }

  deleteNotification(notification: Notification) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  clearAllNotifications() {
    this.notifications = [];
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  }

  trackNotification(index: number, notification: Notification): string {
    return notification.id;
  }
}
