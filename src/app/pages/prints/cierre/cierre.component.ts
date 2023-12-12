import { Component } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent {

  public facturas:any;
  public arr:any;
  public arrDetalle:any;
  public numMax:number = 0;
  public numMin:number = 0;
  public factura:string = '';
  public valor:number = 0;

  constructor(
    private route : ActivatedRoute, 
  ) { }

  ngOnInit(): void {

    this.urlVar();

    /* window.print();
    setTimeout(() => {
      
      window.close();
    }, 1000); */
   
  }

  urlVar() {

    this.route.paramMap.subscribe(params => {
       const data:any = params.get('data');

       this.arr = JSON.parse(data);

       let numeroMayor = 0;
       let numeroMenor = 0;
       let sumTotal = 0;

       this.arrDetalle = []

       console.log(this.arr)
       
       this.arr.forEach((e:any) => {
        
          this.factura = e.idprefijo;

          sumTotal = sumTotal + Number(e.vlrtotal);
          
          if (e.numdoc > numeroMayor) {
            numeroMayor = e.numdoc;
          }

          if (e.numdoc > numeroMenor) {
            numeroMenor = e.numdoc;
          }

          e.detalle.forEach((l:any) => {

            this.arrDetalle.push({
              cantidad:l.cantidad,
              idprefijo: l.idprefijo,
              idarticulo: l.idarticulo,
              vlrtotal: l.vlrtotal
            })
          });
       });

       this.valor = sumTotal;
       this.numMax = numeroMayor;
       this.numMin = numeroMenor;

      
    });

  }
}
