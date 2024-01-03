import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArticuloService } from './articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent {
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
  ) {}

  ngOnInit(): void {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.start();
  }
  start() {
    this.http.get().subscribe((res: any) => {
      this.table = res;
    });
  }

  create() {
    const modal = this.elementRef.nativeElement.querySelector('#exampleModal');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
    }
    // this.http.create(this.info).subscribe((res: any) => {
    //   this.info = {};
    // });
  }
}
