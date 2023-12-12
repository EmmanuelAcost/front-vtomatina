import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from './api.service';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Report  } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { DataTableDirective } from 'angular-datatables';

import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { PrintsFacturas } from 'src/app/interfaces/PrintsFactura.interface';

@Component({
  selector: 'app-prefactura',
  templateUrl: './prefactura.component.html',
  styleUrls: ['./prefactura.component.scss']
})
export class PrefacturaComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  public tabla:any = [];
  public status: boolean = false;
  public fecha1:string = dayjs().format('YYYY-MM-DD');
  public fecha2:string = dayjs().format('YYYY-MM-DD');
  public pantalla: number = 0;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private http:ApiService,
    private router : Router,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.viewAll(this.fecha1,this.fecha2);
   
  }

  viewAll(fecha1:string,fecha2:string){

    Loading.standard('Loading...');

    this.http.viewAll(fecha1,fecha2).subscribe( (res:any) => {
     
      const { results,turno } = res;

      this.pantalla = 0;
      
      if(turno.length == 0){
        this.pantalla = 2;
      }else{
        if( turno[0].fechaapertura == turno[0].fechacierre ){
          this.pantalla = 1;
          if( results.length ){
            console.log(results)
            this.tabla = results;
            this.dtTrigger.next(results);
          }else{
            this.tabla = [];
          }
        }else{
          this.pantalla = 2;
        }
      }

     
      Loading.remove();
    },
    (err: any)=>{
      Loading.remove();
      console.log(err);
    });
    
  }

  buscarFactura(){
    if( this.tabla.length ){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.buscarFactura();
      });
    }else{
      this.viewAll(this.fecha1, this.fecha2);
    }
   
  }

  crear(){
    Confirm.show(
      'Frappe',
      'Deseas crear una nueva factura?',
      'Yes',
      'No',
      () => {
        
        Loading.standard('Loading...');

        this.http.create().subscribe( (res:any) => {
         
          Loading.remove();
            const {id,idbodega,idempresa,idprefijo,numdoc } = res;

            this.router.navigate(['prefactura_detalle',{
              ruta:"prefactura_detalles",
              empresa:idempresa,
              doc:numdoc,
              prefijo:idprefijo
            }]);
           
        });
      },
      () => {
        Loading.remove();
      },
      {
      },
      );
  }

  continuar(t:any){
   
    const {numdoc,idempresa,idprefijo} = t;

    this.router.navigate(['prefactura_detalle',{
      ruta:"prefactura_detalles",
      empresa:idempresa,
      doc:numdoc,
      prefijo:idprefijo
    }]);

  }

  fechaHora(f:string){

    return dayjs(f).format('YYYY-MM-DD');
  }

 async imprimir(t:any) {
 
    Loading.standard('Loading...');

    let arr = {
      "empresa":t.factura_empresa,
      "bodega":t.factura_bodega,
      "prefijo":t.factura_prefijo,
      "doc":t.factura_num
    }
    await this.http.view(arr).subscribe( (res:PrintsFacturas) => {
      Loading.remove();
      this.printsHtml(res);
    },
    (err: any)=>{
      Loading.remove();
      console.log(err);
    });
  
  }
  
  printsHtml(datos:any){
  
    window.open(`print_factura;data=${JSON.stringify(datos)}`, '_blank');
  }
}