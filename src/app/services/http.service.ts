import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthConstants} from 'src/app/config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public apiUrl: string = environment.apiUrl;
  public Storage:any  = localStorage;

  constructor(
    private http: HttpClient,
  ) { }

  get( serviceName: string){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Allow": "GET, POST, OPTIONS, PUT, DELETE",
      "Authorization": 'Bearer '+token,
    });

    const options = { headers: headers, withCredeintials: false };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.get(url,options);

  }

  post( serviceName: string, data: any){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Allow": "GET, POST, OPTIONS, PUT, DELETE",
        "Authorization": 'Bearer '+token,
      }
    );
    const options = { headers: headers, withCredeintials: false };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.post(url, data,options);

  }

  patch( serviceName: string, data: any){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Allow": "GET, POST, OPTIONS, PUT, DELETE",
        "Authorization": 'Bearer '+token,
      }
    );
    const options = { headers: headers, withCredeintials: false };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.patch(url, data,options);

  }

  delete( serviceName: string){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Allow": "GET, POST, OPTIONS, PUT, DELETE",
        "Authorization": 'Bearer '+token,
      }
    );
    const options = { headers: headers, withCredeintials: false };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.delete(url,options);

  }
}
