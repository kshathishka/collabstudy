import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <div class="app-container dark-theme">
      <mat-sidenav-container class="sidenav-container">
        
        <!-- Sidebar -->
        <mat-sidenav #sidenav mode="side" opened="true" class="sidenav">
          <div class="sidenav-header">
            <div class="user-profile">
              <mat-icon class="user-avatar">account_circle</mat-icon>
              <div class="user-info">
                <span class="user-name">John Doe</span>
                <span class="user-email">john@example.com</span>
              </div>
            </div>
          </div>
          
          <mat-nav-list class="nav-list">
            <h3 matSubheader>Navigation</h3>
            
            <a mat-list-item routerLink="/rooms" routerLinkActive="active">
              <mat-icon matListItemIcon>group</mat-icon>
              <span matListItemTitle>Study Rooms</span>
            </a>
            
            <a mat-list-item routerLink="/sessions" routerLinkActive="active">
              <mat-icon matListItemIcon>event</mat-icon>
              <span matListItemTitle>Sessions</span>
            </a>
            
            <a mat-list-item routerLink="/notes" routerLinkActive="active">
              <mat-icon matListItemIcon>description</mat-icon>
              <span matListItemTitle>Notes</span>
            </a>
            
            <a mat-list-item routerLink="/chat" routerLinkActive="active">
              <mat-icon matListItemIcon>chat</mat-icon>
              <span matListItemTitle>Chat</span>
            </a>
            
            <mat-divider></mat-divider>
            
            <h3 matSubheader>Quick Actions</h3>
            
            <a mat-list-item>
              <mat-icon matListItemIcon>add_circle</mat-icon>
              <span matListItemTitle>Create Room</span>
            </a>
            
            <a mat-list-item>
              <mat-icon matListItemIcon>schedule</mat-icon>
              <span matListItemTitle>Schedule Session</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content>
          <!-- Top Toolbar -->
          <mat-toolbar class="top-toolbar">
            <button mat-icon-button (click)="sidenav.toggle()" class="menu-toggle">
              <mat-icon>menu</mat-icon>
            </button>
            
            <div class="toolbar-title-section">
              <mat-icon class="app-logo">school</mat-icon>
              <span class="app-title">CollabStudy</span>
            </div>
            
            <span class="toolbar-spacer"></span>
            
            <div class="toolbar-actions">
              <button mat-icon-button 
                      class="notification-button"
                      [matBadge]="notificationCount" 
                      matBadgeColor="warn"
                      [matBadgeHidden]="notificationCount === 0"
                      [matMenuTriggerFor]="notificationMenu">
                <mat-icon>notifications</mat-icon>
              </button>
              
              <button mat-icon-button [matMenuTriggerFor]="userMenu">
                <mat-icon>account_circle</mat-icon>
              </button>
            </div>
          </mat-toolbar>

          <!-- Notification Menu -->
          <mat-menu #notificationMenu="matMenu" class="notification-menu">
            <div class="notification-header">
              <h4>Notifications</h4>
              <span class="notification-count">{{notificationCount}} new</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="notification-list">
              <div class="notification-item" *ngFor="let notification of notifications">
                <mat-icon class="notification-icon">
                  {{getNotificationIcon(notification.type)}}
                </mat-icon>
                <div class="notification-content">
                  <div class="notification-title">{{notification.title}}</div>
                  <div class="notification-message">{{notification.message}}</div>
                  <div class="notification-time">{{notification.time}}</div>
                </div>
              </div>
            </div>
            
            <mat-divider></mat-divider>
            <button mat-menu-item class="view-all-notifications">
              <mat-icon>visibility</mat-icon>
              View All Notifications
            </button>
          </mat-menu>

          <!-- User Menu -->
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              Profile
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              Settings
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>exit_to_app</mat-icon>
              Sign Out
            </button>
          </mat-menu>

          <!-- Content Area -->
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  notificationCount = 3;
  
  notifications = [
    {
      type: 'session',
      title: 'Session Starting Soon',
      message: 'JavaScript Study Group starts in 15 minutes',
      time: '2 min ago'
    },
    {
      type: 'message',
      title: 'New Message',
      message: 'John: Have you reviewed the notes for today?',
      time: '5 min ago'
    },
    {
      type: 'room',
      title: 'New Room Created',
      message: 'React Advanced Concepts room is now available',
      time: '10 min ago'
    }
  ];

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'session': return 'schedule';
      case 'message': return 'message';
      case 'room': return 'group';
      default: return 'notifications';
    }
  }
}