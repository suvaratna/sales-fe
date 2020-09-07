import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResource } from '../models/user-resource';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserResource>;
  public currentUser: Observable<UserResource>;

  constructor(private apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<UserResource>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserResource {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.apiService.post('api/auth/UserAuthenticate', {'UserName': username, 'Password': password}, {message: ''})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.Resource && user.Resource.Token) {
          localStorage.setItem('currentUser', JSON.stringify(user.Resource));
          this.currentUserSubject.next(user.Resource);
        }
        return user.Resource;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
