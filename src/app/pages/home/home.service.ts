import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpService) { }


  getWinerySales(data: any): Observable<any> {
    const { fecha1, fecha2 } = data
    return this.httpService.get(`invoice/report/totalsales?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
  getTotalSales(): Observable<any> {
    return this.httpService.get(`invoice/report/generalsales`);
  }
  getAllSales(data: any): Observable<any> {
    const { fecha1, fecha2 } = data
    return this.httpService.get(`invoice/report/getVentas?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
  getBestSellingProducts(data: any): Observable<any> {
    const { fecha1, fecha2 } = data
    return this.httpService.get(`invoice/report/getarticlesmost?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
  getProductSales(data: any): Observable<any> {
    const { fecha1, fecha2, idstorage } = data

    return this.httpService.get(`invoicedetail/report/getsalesarticles?fecha1=${fecha1}&fecha2=${fecha2}${idstorage ? '&idstorage=' + idstorage : ''}`);
  }
  getPaymentMethodsSales(data: any): Observable<any> {
    const { fecha1, fecha2, idstorage } = data
    return this.httpService.get(`waytopay/report/saleswaytopay?fecha1=${fecha1}&fecha2=${fecha2}${idstorage ? '&idstorage=' + idstorage : ''}`);
  }
  getQuotesSales(data: any): Observable<any> {
    const { month, year, idstorage } = data
    return this.httpService.get(`budget/report/budget${month ? '?month=' + month.toString().padStart(2, '0') : ''}${year ? '&year=' + year : ''}${idstorage ? '&idstore=' + idstorage : ''}`);
  }
  getQuotesTotal(data: any): Observable<any> {
    const { month, year, idstorage } = data
    return this.httpService.get(`budget/report/getpresupuestostotal${month ? '?month=' + month.toString().padStart(2, '0') : ''}${year ? '&year=' + year : ''}`);
  }
  getAllStore(): Observable<any> {
    return this.httpService.get('store')
  }
}
