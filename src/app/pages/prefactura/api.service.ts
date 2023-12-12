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

  viewAll(fecha1:string,fecha2:string ): Observable<any>{ 
    return this.httpService.get(`vtaprefactura/verPrefactura/${fecha1}/${fecha2}`);
  }

  create(): Observable<any>{ 
    return this.httpService.post(`vtaprefactura/crearPreFactura`,[]);
  }

  
  view(data:any): Observable<any>{ 
    return this.httpService.post(`prints/factura`,data);
  }
}
