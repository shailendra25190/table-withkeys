import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }
  fetchData(endpoint: string, args = {}, httpmethod = 'GET'): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ` + token,
      })
    };
    return this.http.get(endpoint)
      .pipe(map(data => data),
        catchError(this.handleError('Error in getting data', {}))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => { // TODO: send the error to remote logging infrastructure

			console.log(error)
			if (error.status == 401 || error.status == 403) {
				// this.router.navigate(['/login']);
			}
			else {
				let obj: any = {
					error: true,
					message: error.error && error.error.message ? error.error.message : 'Something went wrong, please try again later.',
					status: error.status
				}
				result = obj;
			}
			console.log(result)
			return of(result as T);
		};
	}
}
