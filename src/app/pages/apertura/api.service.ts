import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: HttpService,
  ) { }

  viewAll(data: any): Observable<any> {
    return this.httpService.get(`turn/table/${data}`);
  }

  getStore(data: any): Observable<any> {
    return this.httpService.get(`store/${data}`)
  }
  viewFacturaApertura(idempresa: number, idbodega: string, idturno: number): Observable<any> {
    return this.httpService.get(`vtafactura/viewApertura/${idempresa}/${idbodega}/${idturno}`);
  }
  createTurn(data: any): Observable<any> {
    return this.httpService.post('turn', data)
  }

}
