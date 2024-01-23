import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private httpService: HttpService) { }

  stores(): Observable<any> {
    return this.httpService.get(`store`);
  }
  getReportGeneral(fecha1: string, fecha2: string, idstorage: string): Observable<any> {
    return this.httpService.get(`invoice/report/totalsales?fecha1=${fecha1}&fecha2=${fecha2}${idstorage ? '&idstore=' + idstorage : ""}`)
  }



}
