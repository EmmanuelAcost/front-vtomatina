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
    return this.httpService.get(`two-category`);
  }

  viewProducts(data:any): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/viewArticle`,data);
  }

  tableProducts(data:any): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/viewTable`,data);
  }

  delteProduct(data:any): Observable<any>{ 
    return this.httpService.delete(`vtaprefactura/deleteTable/${JSON.stringify(data)}`);
  }

  productsAdd(data:any): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/addArticle`,data);
  }

  productsSum(data:any): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/sumArticle`,data);
  }

  productsRes(data:any): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/resArticle`,data);
  }

  viewTerceros(id:string): Observable<any>{ 
    return this.httpService.get(`terceros/prefactura/${id}`);
  }

  savefactura(data:any): Observable<any>{ 
    return this.httpService.post(`vtafactura/saveFactura`,data);
  }

}
