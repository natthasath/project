import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product.model';
import { RegisterResponse } from '../models/user.model';
import { LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  /*getAllProduct(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>("http://192.168.0.102:5000/api/Product",
      {
        headers: new HttpHeaders({
          Authorization: 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFpeWFzaXQudEBnbWFpbC5jb20iLCJpZCI6IjMiLCJ1c2VybmFtZSI6InRhbmFrb3JuIiwicG9zaXRpb24iOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNTc3MzQzMzQyLCJpc3MiOiJDb2RlTW9iaWxlcyBMdGQiLCJhdWQiOiJodHRwOi8vY29kZW1vYmlsZXMuY29tIn0.2T_Al-kBWaQztcXYGLdcsi5lGo-VwKzKnjoVjyPIHXI'
        })
      })
  }*/

  register(data): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>("http://192.168.0.102:5000/api/auth/register", data)
  }

  login(data): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>("http://192.168.0.102:5000/api/auth/login", data)
  }

  getAllProduct(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>("http://192.168.0.102:5000/api/Product")
  }
}
