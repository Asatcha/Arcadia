import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'user';
  private roleKey = 'userRole';
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signal pour suivre l'état de connexion
  isLoggedIn$ = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  login(loginDto: Login): Observable<any> {
    return this.http
      .post<{ accessToken: string; user: any; role: string }>(`/login`, loginDto)
      .pipe(
        map((response) => {
          this.setAuthToken(response.accessToken);
          this.setUser(response.user);
          this.setUserRole(response.role);
          
          // Mettre à jour le signal isLoggedIn
          this.isLoggedIn$.set(true);

          return response;
        }),
        catchError((error) => {
          console.error('Erreur de connexion :', error);
          throw error;
        }),
      );
  }

  logout() {
    this.clearAuthData();
    this.isLoggedIn$.set(false);
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.roleKey);
  }
}
