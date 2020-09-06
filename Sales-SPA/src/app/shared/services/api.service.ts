import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(
        tap((res) => this.getReturnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  }

  private getReturnData(res: any) {
    return res || {};
  }

  post(path: string, body: Object = {}, obj = { message: 'Saved successfully!' }): Observable<any> {
      return this.http.post(
        `${environment.api_url}${path}`,
        body
      ).pipe(
        tap((res) => this.postReturnData(res, obj)),
        catchError((err) => this.getformatErrors(err))
      );
    }

    private postReturnData(res: any, obj = { message: '' }) {
      if (obj.message !== '') {
        if (res && res.Messages && res.Messages.length > 0) {
          obj.message = res.Messages[0];
        }
      }
      return res || {};
    }

  public getformatErrors(error: any): any {
    // this.stopBlockUp();
  }

  put(path: string, body: any, obj = { message: 'Update successfully!' }): Observable<any> {
    return this.http.put(
    `${environment.api_url}${path}`,
    body)
    .pipe(
      tap((res) => this.postReturnData(res, obj)),
      catchError((err) => this.getformatErrors(err))
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(
      tap((res) => this.getReturnData(res)),
      catchError(this.formatErrors)
    );
  }

  public formatErrors(error: any): any {
    if (error.status == 401 || error.status == 403) {

      // this.toastr.error('', 'Session expired please login again.');
    }
    return throwError(error.error);
  }
}
