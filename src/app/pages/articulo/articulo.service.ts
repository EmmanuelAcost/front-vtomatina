import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  constructor(private httpService: HttpService) {}

  get(): Observable<any> {
    return this.httpService.get(`article`);
  }

  create(data: any): Observable<any> {
    return this.httpService.post(`article`, data);
  }
}
