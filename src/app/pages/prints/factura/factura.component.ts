import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute, Router} from '@angular/router';
import { PrintsFacturas, varPrintsFacturasa } from 'src/app/interfaces/PrintsFactura.interface';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit{

  public facturas:any;
  public totalICO:number = 0;
  public tt:any;

  constructor(
    private http:ApiService,
    private route : ActivatedRoute, 
  ) { }

  ngOnInit(): void {

    this.urlVar();

    window.print();
    setTimeout(() => {
      
      window.close();
    }, 1000);
   
  }

  urlVar() {

    this.route.paramMap.subscribe(params => {
       this.tt = params.get('data');

       const res = JSON.parse(this.tt);

       const {facturaDetalle} = res;
     
       this.facturas = res;
 
       facturaDetalle.forEach((ele:any) => {
         this.totalICO = this.totalICO + ele.totalfactura * 0.074;
       });

    });

  }

}
