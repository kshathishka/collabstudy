import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient) { }

  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<{message: string, token: string, user: User}> {
    return this.http.post<{message: string, token: string, user: User}>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{message: string, token: string, user: User}> {
    return this.http.post<{message: string, token: string, user: User}>(`${this.apiUrl}/login`, credentials);
  }

  logout(userId: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.apiUrl}/logout`, { userId });
  }

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?search=${searchTerm}`);
  }

  // Token management
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // User management
  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}