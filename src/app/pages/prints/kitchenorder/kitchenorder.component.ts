import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kitchenorder',
  templateUrl: './kitchenorder.component.html',
  styleUrls: ['./kitchenorder.component.scss']
})
export class KitchenorderComponent {
  public facturas: any;
  public detail: any;
  public pay: any;
  public totalICO: number = 0;
  public tt: any;

  constructor(
    private http: ApiService,
    private route: ActivatedRoute,
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
      console.log(res)
      const { sql, sql2, sql3 } = res;

      this.facturas = sql;
      this.detail = sql2;
      this.pay = sql3;

      sql2.forEach((ele: any) => {
        console.log(ele)
        this.totalICO = this.totalICO + ele.vlrtotal * 0.074;
      });

    });

  }
}
