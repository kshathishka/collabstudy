import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import { Room } from '../../models/types';

@Component({
  selector: 'app-room-list',
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomList implements OnInit {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  
  rooms: Room[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.loading = true;
    this.error = null;
    
    // Mock data for now since backend might not be connected
    setTimeout(() => {
      this.rooms = [
        {
          _id: '1',
          name: 'JavaScript Study Group',
          description: 'Learn modern JavaScript, ES6+, and frameworks together. Perfect for beginners and intermediate developers.',
          subject: 'Computer Science',
          capacity: 25,
          isPrivate: false,
          creator: { id: '1', name: 'John Doe', email: 'john@example.com', isOnline: true, lastSeen: new Date(), joinedRooms: [] },
          members: [
            { user: { id: '1', name: 'John Doe', email: 'john@example.com', isOnline: true, lastSeen: new Date(), joinedRooms: [] }, joinedAt: new Date(), role: 'admin' },
            { user: { id: '2', name: 'Jane Smith', email: 'jane@example.com', isOnline: false, lastSeen: new Date(), joinedRooms: [] }, joinedAt: new Date(), role: 'member' }
          ],
          tags: ['javascript', 'programming', 'beginner'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '2',
          name: 'Data Structures & Algorithms',
          description: 'Deep dive into DSA concepts, practice coding problems, and prepare for technical interviews.',
          subject: 'Computer Science',
          capacity: 20,
          isPrivate: false,
          creator: { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', isOnline: true, lastSeen: new Date(), joinedRooms: [] },
          members: [
            { user: { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', isOnline: true, lastSeen: new Date(), joinedRooms: [] }, joinedAt: new Date(), role: 'admin' }
          ],
          tags: ['algorithms', 'data-structures', 'coding', 'interviews'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '3',
          name: 'React Development',
          description: 'Build modern web applications with React, hooks, context, and best practices.',
          subject: 'Web Development',
          capacity: 30,
          isPrivate: true,
          creator: { id: '3', name: 'Mike Johnson', email: 'mike@example.com', isOnline: false, lastSeen: new Date(), joinedRooms: [] },
          members: [
            { user: { id: '3', name: 'Mike Johnson', email: 'mike@example.com', isOnline: false, lastSeen: new Date(), joinedRooms: [] }, joinedAt: new Date(), role: 'admin' }
          ],
          tags: ['react', 'frontend', 'javascript', 'hooks'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      this.loading = false;
    }, 1000);
  }

  joinRoom(room: Room) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.snackBar.open('Please log in to join a room', 'Close', { duration: 3000 });
      return;
    }

    // Mock join functionality
    this.snackBar.open(`Joined ${room.name}!`, 'Close', { duration: 3000 });
  }

  getCapacityStatus(room: Room): string {
    const percentage = (room.members.length / room.capacity) * 100;
    if (percentage >= 90) return 'full';
    if (percentage >= 70) return 'nearly-full';
    return 'available';
  }
}
