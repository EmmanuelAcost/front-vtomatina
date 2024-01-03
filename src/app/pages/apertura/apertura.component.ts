import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { ApiService } from './api.service';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';

export interface aperturaInter {
  id: number;
  idempresa: number;
  idbodega: string;
  idturno: number;
  fechaapertura: string;
  fechacierre: string;
  idusuario: string;
  base: string;
}


@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
  styleUrls: ['./apertura.component.scss']
})
export class AperturaComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public tabla: any = [];

  constructor(
    private http: ApiService,
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.viewAll();

  }

  viewAll() {

    Loading.standard('Loading...');

    this.http.viewAll().subscribe((res: any) => {


      if (res.length) {
        this.tabla = res;
        this.dtTrigger.next(res);
      } else {
        this.tabla = [];
      }

      Loading.remove();
    },
      (err: any) => {
        Loading.remove();
        console.log(err);
      });

  }

  crear() {
    this.http.viewAll().subscribe((res: any) => {
      console.log(res)
    })
  }

  async imprimir(t: aperturaInter) {

    Loading.standard('Loading...');

    this.http.viewFacturaApertura(t.idempresa, t.idbodega, t.idturno).subscribe((res: any) => {
      window.open(`cierre;data=${JSON.stringify(res)}`, '_blank');
      Loading.remove();
    },
      (err: any) => {
        Loading.remove();
        console.log(err);
      });

  }

  continuar(t: any) {

  }

  fechaHora(f: string) {

    return dayjs(f).format('YYYY-MM-DD');
  }
}
