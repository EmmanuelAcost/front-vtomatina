import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArticuloService } from './articulo.service';
import { Loading } from 'notiflix';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public status: any = '';
  public table: any = [];
  public info: any = {};
  constructor(
    private http: ArticuloService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.dtOptions = { pagingType: 'full_numbers' };
    // No llames a start aquí
  }

  ngAfterViewInit(): void {
    this.start();
  }
  start() {
    this.http.get().subscribe((res: any) => {
      this.table = res;

      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(res);
        });
      } else {
        this.dtTrigger.next(res);
      }
    });
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


  create() {
    Loading.standard('Loading...');
    this.http.create(this.info).subscribe((res: any) => {
      this.info = {};
      this.start();
      this.closeModal();
      Loading.remove();

    });
  }
}
