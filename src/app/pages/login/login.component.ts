import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';

import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  createUser: FormGroup;
  public status: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http:ApiService,
    public router: Router,
    public storageService: StorageService,
  ) { 
    this.createUser = this.fb.group({
      user: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  async addUser(){

    if(this.createUser.invalid){

      Report.warning(
      'Frappe',
      '"LLene todos los campos',
      'Okay',
      );
      return;
    }

    this.status = true;
    Loading.standard('Loading...');

    const user:any = {
      user: this.createUser.value.user,
      password: this.createUser.value.password
    }

    await this.http.auth(user).subscribe( (res:any) => {
      
      this.status = false;
      const { token } = res;
      Loading.remove();
    
      this.storageService.store(AuthConstants.AUTH, token);
      this.router.navigate(['home']);
     
    },
    (err: any)=>{

      this.status = false;
      Loading.remove();

      const { error } = err;
      const { message, name, ok , status, statusText, url} = error;

      let arrmensaje = "";
      if (typeof message === 'string') {
        arrmensaje = message;
      }else{
        message.forEach((e:any) => {
          arrmensaje = arrmensaje + e
        });
      }
      
     Report.warning(
      'Frappe',
      arrmensaje,
      'Okay',
      );
    });


  }


}
