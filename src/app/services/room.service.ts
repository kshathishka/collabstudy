import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3000/api/rooms';

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  createRoom(roomData: {
    name: string;
    description: string;
    subject: string;
    capacity: number;
    isPrivate: boolean;
    password?: string;
    creatorId: string;
    tags: string[];
  }): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, roomData);
  }

  joinRoom(roomId: string, userId: string): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/${roomId}/join`, { userId });
  }

  leaveRoom(roomId: string, userId: string): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/${roomId}/leave`, { userId });
  }

  updateRoom(roomId: string, roomData: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${roomId}`, roomData);
  }

  deleteRoom(roomId: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${roomId}`);
  }
}