import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductAllResponse, Product, ProductResponse } from '../models/product.model';
import { RegisterResponse } from '../models/user.model';
import { LoginResponse } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}`;
  // -----------------------------------------------------
  private loginURL = `${this.apiURL}/auth/login`;
  private registerURL = `${this.apiURL}/auth/register`;
  private productURL = `${this.apiURL}/product`;
  public productImageURL = `${this.apiURL}/product/images`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

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
    return this.httpClient.post<RegisterResponse>(this.registerURL, data)
  }

  login(data): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginURL, data)
  }

  // http https, 4200 5001
  // Ajax CORS webapi () -> backend

  getAllProduct(): Observable<ProductAllResponse> {
    return this.httpClient.get<ProductAllResponse>(this.productURL)
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${this.productURL}/${id}`)
  }

  deleteProduct(id: number): Observable<ProductAllResponse> {
    return this.httpClient.get<ProductAllResponse>(`${this.productURL}/${id}`)
  }

  newProduct(data: Product): Observable<ProductAllResponse> {
    return this.httpClient.post<ProductAllResponse>(this.productURL, this.makeFormData(data))
  }

  // editProduct(data: Product, id: number): Observable<ProductAllResponse> {
  //   return this.httpClient.put<ProductAllResponse>(`${this.productURL}/${id}`, this.makeFormData(data))
  // }

  editProduct(data: Product, id: number): Observable<ProductResponse> {
    return this.httpClient.put<ProductResponse>(`${this.productURL}/${id}`, this.makeFormData(data))
  }

  makeFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', `${product.price}`);
    formData.append('stock', `${product.stock}`);
    formData.append('upload_file', product.image);
    return formData;
  }
}
