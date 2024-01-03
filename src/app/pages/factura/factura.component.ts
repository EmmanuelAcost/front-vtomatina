import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from './factura.service';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { DataTableDirective } from 'angular-datatables';

import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { PrintsFacturas } from 'src/app/interfaces/PrintsFactura.interface';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaViewComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  public tabla: any = [];
  public status: boolean = false;
  public fecha1: string = dayjs().format('YYYY-MM-DD');
  public fecha2: string = dayjs().format('YYYY-MM-DD');
  public pantalla: number = 0;
  public userId: any = localStorage.getItem('idU');
  public storeId: any = localStorage.getItem('idB');
  public turnoId: any = localStorage.getItem('idT');

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private http: FacturaService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.start();
  }
  start() {
    this.viewAll(this.userId, this.storeId, this.fecha1, this.fecha2);
  }

  viewAll(userId: string, storeId: string, fecha1: string, fecha2: string) {
    Loading.standard('Loading...');

    this.http.get(userId, storeId, fecha1, fecha2).subscribe(
      (res: any) => {
        const { results, turno } = res;
        this.pantalla = 0;

        if (turno.length == 0) {
          this.pantalla = 2;
        } else {
          if (turno[0].fechaapertura == turno[0].fechacierre) {
            this.turnoId = turno[0].id;
            localStorage.setItem('idT', turno[0].id);
            this.pantalla = 1;
            if (results.length) {
              this.tabla = results;
              this.dtTrigger.next(results);
            } else {
              this.tabla = [];
            }
          } else {
            this.pantalla = 2;
          }
        }

        Loading.remove();
      },
      (err: any) => {
        Loading.remove();
        console.log(err);
      }
    );
  }

  buscarFactura() {
    if (this.tabla.length) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.buscarFactura();
      });
    } else {
      this.viewAll(this.userId, this.storeId, this.fecha1, this.fecha2);
    }
  }

  crear() {
    Confirm.show(
      'Frappe',
      'Deseas crear una nueva factura?',
      'Yes',
      'No',
      () => {
        Loading.standard('Loading...');
        const payload = {
          idstorage: this.storeId,
          iduser: this.userId,
          idturno: this.turnoId,
        };
        this.http.create(payload).subscribe((res: any) => {
          Loading.remove();
          const { id, idstorage, idprefix, numdoc } = res.data;
          this.router.navigate([
            'factura_detalle',
            {
              ruta: 'factura_detalle',
              doc: numdoc,
              idprefix: idprefix,
              idstorage: idstorage,
            },
          ]);
        });
      },
      () => {
        Loading.remove();
      },
      {}
    );
  }

  continuar(t: any) {
    const { id, idstorage, idprefix, numdoc } = t;

    this.router.navigate([
      'factura_detalle',
      {
        ruta: 'factura_detalle',
        doc: numdoc,
        idprefix: idprefix,
        idstorage: idstorage,
      },
    ]);
  }

  fechaHora(f: string) {
    return dayjs(f).format('DD/MM/YYYY');
  }

  async imprimir(t: any) {
    Loading.standard('Loading...');
    console.log(t)

    let arr = {
      idstorage: t.idstorage,
      idprefix: t.idprefix,
      doc: t.numdoc,
    };
    await this.http.view(arr).subscribe(
      (res: PrintsFacturas) => {
        Loading.remove();
        this.printsHtml(res);
      },
      (err: any) => {
        Loading.remove();
        console.log(err);
      }
    );
  }

  printsHtml(datos: any) {
    window.open(`print_factura;data=${JSON.stringify(datos)}`, '_blank');
  }
}
