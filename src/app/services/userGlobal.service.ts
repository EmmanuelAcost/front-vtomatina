import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service'
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserGlobal {

    private user: Users[] = [];
    private _user: BehaviorSubject<Users[]>;

  constructor(
    private http: HttpService,
    private storageService:StorageService,
    private router: Router, 
  ) { 
    this._user = new BehaviorSubject<Users[]>([]);
  }

  verLogin(): Observable<any>{ 
   
    return this.http.get('user');
  }

  get users() {
    return this._user.asObservable();
  }

 async addNewUser(){
    const existUser:any = await this.apiExistUser();
    this._user.next(existUser);
  }

  apiExistUser = ( ) => {
    return new Promise( (resolve, reject) => {
      this.verLogin().subscribe( (res:any) => {
     
        resolve(res);
      },
      (err: any)=>{
        const {error} = err;
        const { message, statusCode } = error;

        if(statusCode == 401){
          this.storageService.clear();
          this.router.navigate(['login']);
        }

      })
    });
  }


}
