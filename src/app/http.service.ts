import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap, map, mergeMap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseApiUrl = "http://dataservice.accuweather.com";

  constructor(private http: HttpClient) { }

  private getHttpHeaders() {
    return new HttpHeaders({
      
    });
  }

  public get<T>( endpoint: string, queryStringParams?: HttpParams ): Observable<T> {
 
    return this.http.get<any>(
      `${this.baseApiUrl}/${endpoint}`,
        {
          headers: this.getHttpHeaders(),
          observe: 'response',
          params: queryStringParams,
        }
    )
    .pipe(
      catchError( (err: HttpErrorResponse) => {
        return this.handleError(err);
      }),
      map((response: any) => {
        return (!isNullOrUndefined(response)) && response.body ? response.body : null;
      }),
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.')
  }

}
