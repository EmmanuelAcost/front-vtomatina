import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpService) { }

  viewAll(): Observable<any> {
    return this.httpService.get(`category`);
  }

  viewProducts(data: any): Observable<any> {
    return this.httpService.post(`article/viewArticle`, data);
  }

  tableProducts(data: any): Observable<any> {
    return this.httpService.post(`invoicedetail/viewTable`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.httpService.delete(`invoicedetail/${id}`);
  }

  productsAdd(data: any): Observable<any> {
    return this.httpService.post(`invoicedetail/addArticle`, data);
  }

  productsSum(data: any): Observable<any> {
    return this.httpService.post(`invoicedetail/sumArticle`, data);
  }

  productsRes(data: any): Observable<any> {
    return this.httpService.post(`invoicedetail/resArticle`, data);
  }

  viewTerceros(id: string): Observable<any> {
    return this.httpService.get(`third/${id}`);
  }

  savefactura(data: any, va: any): Observable<any> {
    return this.httpService.patch(`invoice/save/${va}`, data);
  }
  view(data: any): Observable<any> {
    return this.httpService.get(`invoice/print/${data.idstorage}/${data.idprefix}/${data.doc}`);
  }
}
