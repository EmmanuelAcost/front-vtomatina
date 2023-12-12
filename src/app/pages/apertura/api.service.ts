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

  viewAll(): Observable<any>{ 
    return this.httpService.get(`vtaturno`);
  }

  viewFacturaApertura(idempresa:number,idbodega:string,idturno:number): Observable<any>{ 
    return this.httpService.get(`vtafactura/viewApertura/${idempresa}/${idbodega}/${idturno}`);
  }

}
