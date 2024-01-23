import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public countries: any[] | undefined;
  public selectedCountry: any = { code: "" };
  public dateStart: any = new Date()
  public dateEnd: any = new Date()
  public products: any
  public total = 0

  constructor(private http: GeneralService) { }

  ngOnInit() {
    this.start()
  }
  start() {
    this.http.stores().subscribe((res: any) => {
      this.countries = res
      console.log(this.countries)
    })
  }
  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const anio = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Meses comienzan en 0
    const dia = ('0' + fecha.getDate()).slice(-2);
    return `${anio}-${mes}-${dia}`;
  }
  search() {
    this.http.getReportGeneral(this.formatearFecha(this.dateStart), this.formatearFecha(this.dateEnd), this.selectedCountry?.code).subscribe((res: any) => {
      console.log(res)
      this.products = res
      res.map((item: any) => { this.total = this.total + parseFloat(item.total) })
    })
  }
}
