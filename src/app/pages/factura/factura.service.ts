import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private httpService: HttpService) { }

  get(
    userId: string,
    storeId: string,
    fecha1: string,
    fecha2: string
  ): Observable<any> {
    return this.httpService.get(
      `invoice/?iduser=${userId}&idstore=${storeId}&fecha1=${fecha1}&fecha2=${fecha2}`
    );
  }

  create(data: any): Observable<any> {
    return this.httpService.post(`invoice`, data);
  }

  view(data: any): Observable<any> {
    return this.httpService.get(`invoice/print/${data.idstorage}/${data.idprefix}/${data.doc}`);
  }
}
