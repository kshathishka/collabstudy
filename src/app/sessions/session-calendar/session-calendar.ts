import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  roomName: string;
  hostName: string;
  attendeesCount: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}

@Component({
  selector: 'app-session-calendar',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatBadgeModule
  ],
  templateUrl: './session-calendar.html',
  styleUrl: './session-calendar.css'
})
export class SessionCalendar implements OnInit {
  selectedDate = new Date();
  
  sessions: Session[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals Review',
      description: 'Going over ES6+ features, async/await, and modern JavaScript patterns',
      startTime: new Date(2025, 8, 25, 10, 0), // Sept 25, 2025, 10:00 AM
      endTime: new Date(2025, 8, 25, 11, 30),
      roomName: 'JavaScript Study Group',
      hostName: 'John Doe',
      attendeesCount: 8,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'React Hooks Deep Dive',
      description: 'Advanced patterns with useEffect, useCallback, and custom hooks',
      startTime: new Date(2025, 8, 25, 14, 0), // Sept 25, 2025, 2:00 PM
      endTime: new Date(2025, 8, 25, 15, 30),
      roomName: 'React Development',
      hostName: 'Mike Johnson',
      attendeesCount: 12,
      status: 'ongoing'
    },
    {
      id: '3',
      title: 'Data Structures Quiz',
      description: 'Testing knowledge on arrays, linked lists, trees, and graphs',
      startTime: new Date(2025, 8, 26, 9, 0), // Sept 26, 2025, 9:00 AM
      endTime: new Date(2025, 8, 26, 10, 0),
      roomName: 'Data Structures & Algorithms',
      hostName: 'Sarah Wilson',
      attendeesCount: 15,
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Node.js Backend Workshop',
      description: 'Building REST APIs with Express and MongoDB integration',
      startTime: new Date(2025, 8, 24, 16, 0), // Sept 24, 2025, 4:00 PM
      endTime: new Date(2025, 8, 24, 18, 0),
      roomName: 'Full Stack Development',
      hostName: 'Alex Chen',
      attendeesCount: 6,
      status: 'completed'
    }
  ];

  ngOnInit() {
    // Set default selected date to today
    this.selectedDate = new Date();
  }

  onDateSelected(date: Date | null) {
    if (date) {
      this.selectedDate = date;
    }
  }

  getSessionsForDate(date: Date): Session[] {
    return this.sessions.filter(session => 
      this.isSameDay(session.startTime, date)
    );
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  dateHasSession = (date: Date): string => {
    return this.sessions.some(session => this.isSameDay(session.startTime, date)) ? 'has-session' : '';
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'scheduled': return 'schedule';
      case 'ongoing': return 'play_circle';
      case 'completed': return 'check_circle';
      default: return 'event';
    }
  }

  getStatusIconClass(status: string): string {
    return status;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'ongoing': return 'Live Now';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  }

  trackSession(index: number, session: Session): string {
    return session.id;
  }
}
