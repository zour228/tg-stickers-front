import { Guid } from '../types';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ADMIN_TOKEN_KEY = 'ADMIN_TOKEN';

const parseToken = (): AdminTokenOutput | null => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  return token ? JSON.parse(token) : null;
};

const tokenSubject$ = new BehaviorSubject<null | AdminTokenOutput>(parseToken());

@Injectable()
export class AdminTokenService {

  store(tokenInfo: AdminTokenOutput): void {
    localStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(tokenInfo));
    tokenSubject$.next(tokenInfo);
  }

  getToken(): AdminTokenOutput | null {
    return tokenSubject$.getValue();
  }

  hasToken$(): Observable<boolean> {
    return tokenSubject$.pipe(map(Boolean));
  }

  eraseToken(): void {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    tokenSubject$.next(null);
  }
}

export interface AdminTokenOutput {
  adminId: Guid;
  name: string;
  login: string;
  accessToken: string;
}
