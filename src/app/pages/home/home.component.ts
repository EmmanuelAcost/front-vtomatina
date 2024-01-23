import { Component } from '@angular/core';
import { UserGlobal } from '../../services/userGlobal.service';
import { ChartConfiguration } from 'chart.js';
import { Users, UserInter } from 'src/app/interfaces/users';
import { HomeService } from './home.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
interface TotalSalesResponse {
  month: string;    // Nombre del mes (en inglés o en español, según lo que devuelva tu backend)
  year: number;     // Año
  valortotal: string; // Total de ventas, asumiendo que es una cadena que representa un número
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public infoUser: any = { rol: "" };
  public allSales: number = 0;
  public productBest: any;
  public quotesTotal: any;
  public date = new Date();
  public barChartLegend = true;
  public barChartPlugins = [];
  public initialdate1 = this.getFormattedDate();
  public finaldate1 = this.getFormattedDate();
  public month: any = '';
  // public month = new Date();

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };
  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };
  public barChartData3: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };
  public barChartData4: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };
  public barChartData5: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ventas Totales por Tienda',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };

  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ventas por productos',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };
  public barChartOptions3: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ventas por medios de pagos',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };
  public barChartOptions4: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Presupuesto',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };
  public barChartOptions5: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ventas Por Mes',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };
  public initColor = [
    'rgba(255, 99, 132, 0.7)',  // rojo
    'rgba(54, 162, 235, 0.7)',  // azul
    'rgba(255, 206, 86, 0.7)',  // amarillo
    'rgba(75, 192, 192, 0.7)',  // verde
    'rgba(153, 102, 255, 0.7)', // púrpura
    // ... más colores según sea necesario
  ];

  public stores: any;
  public selectStore: any;
  public totalReport: number = 0;
  public totalReport2: number = 0;
  public totalReport3: number = 0;
  public totalReport4: number = 0;
  public totalReport4_1: number = 0;

  constructor(private userGlobal: UserGlobal, private homeService: HomeService) { }

  ngOnInit() {
    this.viewUser();
    this.getReport()
    this.start()
  }
  async start() {
    await this.homeService.getAllSales({ "fecha1": this.getFormattedDate(), "fecha2": this.getFormattedDate() }).subscribe((res: any) => {
      this.allSales = res[0]?.valortotal ? parseFloat(res[0]?.valortotal) : 0
    })
    await this.homeService.getBestSellingProducts({ "fecha1": this.getFormattedDate(), "fecha2": this.getFormattedDate() }).subscribe((res: any) => {
      this.productBest = res
    })
    await this.homeService.getQuotesTotal({ "month": this.date.getMonth() + 1, "year": this.date.getFullYear() }).subscribe((res: any) => {
      this.quotesTotal = res[0]

    })
    await this.homeService.getAllStore().subscribe((res: any) => {

      this.stores = res
    })
  }

  async viewUser() {
    await this.userGlobal.addNewUser();
    await this.userGlobal.users.subscribe((res: any) => {
      this.infoUser = res;
      localStorage.setItem("idB", this.infoUser.idstore)
    });
  }
  async getReport() {
    const monthsT: any = {
      'January': 'Enero', 'February': 'Febrero', 'March': 'Marzo',
      'April': 'Abril', 'May': 'Mayo', 'June': 'Junio',
      'July': 'Julio', 'August': 'Agosto', 'September': 'Septiembre',
      'October': 'Octubre', 'November': 'Noviembre', 'December': 'Diciembre'
    };
    await this.homeService.getTotalSales().subscribe((res: TotalSalesResponse[]) => {
      const labels = res.map(item => monthsT[item.month] + ' ' + item.year);
      const data = res.map(item => parseFloat(item?.valortotal));

      // Asegúrate de que tienes suficientes colores, o ajusta esta lógica según sea necesario
      const backgroundColors = res.map((_, index) => this.initColor[index % this.initColor.length]);

      this.barChartData5 = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors, // Asignar colores aquí
            barThickness: 50
          }
        ]
      };

    });
  }
  async search1() {

    await this.homeService.getWinerySales({ "fecha1": this.initialdate1, "fecha2": this.finaldate1 }).subscribe((res: any[]) => {
      const labels = res.map(item => item.store_name);
      const data = res.map(item => parseFloat(item.total));
      this.totalReport = res.reduce((sum, item) => sum + parseFloat(item.total), 0);


      // Asegúrate de que tienes suficientes colores, o ajusta esta lógica según sea necesario
      const backgroundColors = res.map((_, index) => this.initColor[index % this.initColor.length]);

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors, // Asignar colores aquí
            barThickness: 50
          }
        ]
      };

    });
  }
  async search2() {

    await this.homeService.getProductSales({ "fecha1": this.initialdate1, "fecha2": this.finaldate1, "idstorage": this.selectStore?.code }).subscribe((res: any[]) => {
      const labels = res.map(item => item.artnombre.slice(0, 15) + '(' + item.cant + ')');
      const data = res.map((item) => parseFloat(item.total));
      this.totalReport2 = res.reduce((sum, item) => sum + parseFloat(item.total), 0);

      // Asegúrate de que tienes suficientes colores, o ajusta esta lógica según sea necesario
      const backgroundColors = res.map((_, index) => this.initColor[index % this.initColor.length]);

      this.barChartData2 = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors, // Asignar colores aquí
            barThickness: 50
          }
        ]
      };

    });
  }
  async search3() {

    await this.homeService.getPaymentMethodsSales({ "fecha1": this.initialdate1, "fecha2": this.finaldate1 }).subscribe((res: any[]) => {
      const labels = res.map(item => item.nombre_pago);
      const data = res.map(item => parseFloat(item.pago));
      this.totalReport3 = res.reduce((sum, item) => sum + parseFloat(item.pago), 0);

      // Asegúrate de que tienes suficientes colores, o ajusta esta lógica según sea necesario
      const backgroundColors = res.map((_, index) => this.initColor[index % this.initColor.length]);

      this.barChartData3 = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors, // Asignar colores aquí
            barThickness: 50
          }
        ]
      };
    });
  }
  async search4() {

    await this.homeService.getQuotesSales({ "month": this.month ? this.month?.getMonth() + 1 : '', "year": this.month ? this.month?.getFullYear() : '', "idstorage": this.selectStore?.code }).subscribe((res: any[]) => {
      const labels = res.map(item => item.bodega);
      const valortotalData = res.map(item => parseFloat(item?.valortotal));
      const vendidoData = res.map(item => parseFloat(item.vendido));
      this.totalReport4 = res.reduce((sum, item) => sum + parseFloat(item.valortotal), 0);
      this.totalReport4_1 = res.reduce((sum, item) => sum + parseFloat(item.vendido), 0);

      // Asegúrate de que tienes suficientes colores, o ajusta esta lógica según sea necesario
      const backgroundColors = res.map((_, index) => this.initColor[index % this.initColor.length]);

      this.barChartData4 = {
        labels: labels,
        datasets: [
          { data: valortotalData, label: 'Presupuesto' },
          { data: vendidoData, label: 'Vendido' }
        ]
      };
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    this.selectStore = {}
    this.initialdate1 = this.getFormattedDate();
    this.finaldate1 = this.getFormattedDate();
    // Comprueba si la pestaña seleccionada es "Venta Presopuesto"
    // Llama a la función que realiza la llamada a la API
    if (event.index == 0) {
      this.search1()
    }
    if (event.index == 1) {
      this.search2()
    }
    if (event.index == 2) {
      this.search3()
    }
    if (event.index == 3) {
      this.search4()
    }
    if (event.index == 4) {
      this.getReport()
    }
  }

  getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() devuelve un valor de 0 a 11
    const day = today.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

}
