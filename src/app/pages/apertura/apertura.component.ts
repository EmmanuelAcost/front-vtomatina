import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { ApiService } from './api.service';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as bootstrap from 'bootstrap';
import { DataTableDirective } from 'angular-datatables';

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
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public table: any = [];
  public infoStore: any
  public infoUser = localStorage.getItem('idU') || '';
  public storeSession = localStorage.getItem('idB') || '';
  public date = new Date();
  public base = 0;

  constructor(
    private http: ApiService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = { pagingType: 'full_numbers' };
  }
  ngAfterViewInit(): void {
    this.viewAll();
  }
  openModal() {
    this.http.getStore(this.storeSession).subscribe((res: any) => {
      this.infoStore = res
    })
  }

  viewAll() {
    Loading.standard('Loading...');
    this.http.viewAll(this.infoUser).subscribe((res: any) => {
      this.table = res;
      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(res);
        });
      } else {
        this.dtTrigger.next(res);
      }
      Loading.remove();
    },
      (err: any) => {
        Loading.remove();
        console.log(err);
      });

  }

  create() {
    Loading.standard('Loading...');
    this.http.createTurn({
      "idstore": this.infoStore.code,
      "fechopening": this.date,
      "iduser": this.infoUser,
      "base": this.base
    }).subscribe((res: any) => {
      this.closeModal();
      this.viewAll();
      Loading.remove();
    }, (err: any) => {
      Loading.remove();
      console.log(err);
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

    return dayjs(f).format('DD/MM/YYYY');
  }

  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        const backdrops: any = document.getElementsByClassName('modal-backdrop');
        if (backdrops[0]) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
        modalInstance.hide();
      }
    }

  }
}
