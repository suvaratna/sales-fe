import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotificationService } from '../shared/services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService ) { }

  handleError(error: HttpErrorResponse) {

    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    alert('session expired please login again');
                    setTimeout(function() {
                      localStorage.removeItem('currentUser');
                      this.router.navigateByUrl('/login');
                    }, 3000);
                }
        let html = '';
        if (err && err.error.Messages) {
                    err.error.Messages.forEach(item => {
                        html += item ;
                      });

                }
        const error = html || err.statusText;
        this.notificationService.warn(error);
        return throwError(error);
            }));

  }
}
