import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  apiurl = 'http://localhost:3000';
  private readonly _http: HttpClient; // Use HttpClient instead of Inject
  
  constructor(http: HttpClient) {
    this._http = http; // Inject HttpClient in the constructor
  }

  getUser(id: String): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': '123456' }); // Create headers object
    return this._http.get(`${this.apiurl}/user?correo=${id}`, { headers }); // Add headers to the request options
  }

  createUser(user: {}): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': '123456' });
    
    return this._http.post(`${this.apiurl}/user`, user, {headers});
  }

   
  loginUser(user: {}): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': '123456' });
     
    return this._http.post(`${this.apiurl}/login`, user, {headers});

  }

   updateUser(user: {}): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': '123456' });
    return this._http.put(`${this.apiurl}/user`, user, {headers})
   }

  
    deleteUser(id: string): Observable<any>{
      const headers = new HttpHeaders({ 'Authorization': '123456' });
      return this._http.delete(`${this.apiurl}/user/${id}`, {headers})
    }

}
