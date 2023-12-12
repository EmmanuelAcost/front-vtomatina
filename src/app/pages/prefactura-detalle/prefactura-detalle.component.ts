import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { ApiService } from './api.service';
import { Categorias, CategoriasInter, NameCategoryInter } from 'src/app/interfaces/Categorias';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Conceptos, ConceptosInter } from 'src/app/interfaces/conceptos';
import { Terceros, TercerosInter } from 'src/app/interfaces/Terceros';
import { urlVar } from 'src/app/interfaces/UrlVar';

import { Block } from 'notiflix/build/notiflix-block-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-prefactura-detalle',
  templateUrl: './prefactura-detalle.component.html',
  styleUrls: ['./prefactura-detalle.component.scss'],
})
export class PrefacturaDetalleComponent implements OnInit {

  public categorias: Array<Categorias> = [CategoriasInter];
  public products: any;
  public products2: any;
  public productsSelect: any[] = [];
  public totalArticulos:number = 0;
  public subTotal:number = 0;
  public total:number = 0;
  public efectivo:number = 0;
  public tarjetas:number = 0;
  public qr:number = 0;
  public rappy:number = 0;
  public didi:number = 0;
  public recibe:number = 0;
  public vuelto:number = 0;
  public classErro:any = "";

  public arrVarUrl: urlVar = {
    ruta : '',
    empresa  : '',
    doc  : '',
    prefijo : ''
  }

  closeResult = '';
  public varConcepto:Conceptos = ConceptosInter;
  public varClient:Terceros = TercerosInter;
  public arrClient:any;
  public arrModalVariante:any;
  public nameCategory:string = "LIMONADAS";

  constructor(
    private http: ApiService,
    private modalService: NgbModal,
    private route : ActivatedRoute, 
    private el: ElementRef,
    private router : Router
    ) {}


  ngOnInit(): void {
    this.urlVar();
    this.tableProducts()
    this.verCategorias();
    this.viewProducts(NameCategoryInter);
  }

  urlVar() {

    this.route.paramMap.subscribe(params => {
       this.arrVarUrl.ruta = params.get('ruta');
       this.arrVarUrl.empresa = params.get('empresa');
       this.arrVarUrl.doc = params.get('doc');
       this.arrVarUrl.prefijo = params.get('prefijo');

    });

  }

  async verCategorias() {
    await this.http.viewAll().subscribe((res: any) => {
      this.categorias = res;
    });
  }

  async viewProducts(i: any) {
   
    this.nameCategory = i.detalle;
    Block.standard('.js-element');
    let arr = {
      idbodega: '006',
      numdoc: 46,
      category: i.id,
    };

    await this.http.viewProducts(arr).subscribe((res: any) => {
      Block.remove('.js-element');
      this.products = res;
      this.products2 = res;
    });
  }

  async addProducts(p: any) {

    const {variantes} = p;

    let newArr = {
      product:p,
      url:this.arrVarUrl
    }

    Block.standard('.tableProductAdd');

    await this.http.productsAdd(newArr).subscribe((res: any) => {
     
      Block.remove('.tableProductAdd');
      this.tableProducts()
    },
    (err: any)=>{
      Block.remove('.tableProductAdd');
      console.log(err);
    });
  }

  async addProducts2(p: any,i: number) {

    let newProdut =  {
      id_article: p.id_article,
      category:   p.category,
      color:      p.color,
      fuente:     p.fuente,
      image:      p.image,
      name:       p.name,
      price:      p.price,
      variantes: [p.variantes[i]]
    }

    let newArr = {
      product:newProdut,
      url:this.arrVarUrl
    }

    this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK);
    
    Block.standard('.tableProductAdd');

    await this.http.productsAdd(newArr).subscribe((res: any) => {
     
      Block.remove('.tableProductAdd');
      this.tableProducts()
    },
    (err: any)=>{
      Block.remove('.tableProductAdd');
      console.log(err);
    });

  }

  async tableProducts() {
  
    await this.http.tableProducts( this.arrVarUrl ).subscribe((res: any) => {
      
      this.productsSelect = res;
     
      this.totalArticulos = 0;
      this.subTotal = 0;
      this.total = 0;

      res.forEach((ele:any) => {
      
        this.totalArticulos = this.totalArticulos + Number(ele.cantidad);
        this.subTotal =   this.subTotal + Number(ele.vlrtotal);
        this.total =   this.total + Number(ele.vlrtotal);
      });

      this.efectivo = this.total;

    });
  }

  async subtractProducts(product: any) {

    Block.standard('.tableProductAdd');
    if(product.cantidad == 1){
      await this.http.delteProduct(product.id).subscribe((res: any) => {
        Block.remove('.tableProductAdd');
        this.tableProducts();
      });
    }else{
      await this.http.productsRes(product).subscribe((res: any) => {
        Block.remove('.tableProductAdd');
        this.tableProducts();
      });
    }

  }
  
  async sumProducts(product: any) {

    Block.standard('.tableProductAdd');

    await this.http.productsSum(product).subscribe((res: any) => {
      Block.remove('.tableProductAdd');
      this.tableProducts();
    });
    
  }

  async deleteProducts(product: any,variantes:any) {

    Block.standard('.tableProductAdd');
    await this.http.delteProduct({product:product,variantes:variantes}).subscribe((res: any) => {
     
      Block.remove('.tableProductAdd');
      this.tableProducts();
    });
   
  }

  async viewTerceros(event: any) {

    Block.standard('.tableTercero');
    const id = event.target.value;
   
    await this.http.viewTerceros(id).subscribe((res: any) => {
      this.arrClient = res;
      Block.remove('.tableTercero');
    });
  }

  open(content:any,variante:any) {
   
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

    if( Object.entries(variante).length !== 0){
      this.arrModalVariante = variante
    }

	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}

    ModalDismissReasons
	}

  concepto(select:any) {
    this.varConcepto = select;
    this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK)
  }

  tercerosadd(arr:any){
    this.varClient = {
      label: `${arr.pnombre} ${arr.snombre} ${arr.papellido} ${arr.sapellido}`,
      value:arr.documento
    };

    this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK)
  }

  focusQuiere(even:any,tipo:string){

    if(tipo == 't'){
      const searchTerm =even.srcElement.value;
   
      let suma =  this.efectivo + this.tarjetas +  this.qr;
     
      if(suma != this.total){
        this.classErro = 'is-invalid';
      }else{
        this.classErro = '';
      }
     
      this.rappy = 0;
      this.didi = 0;
      this.vuelto = 0;
      this.recibe = 0;
    }else if(tipo == 'e'){
      const searchTerm = even.srcElement.value;
    
      let suma =  this.efectivo + this.tarjetas +  this.qr;
     
      if(suma != this.total){
        this.classErro = 'is-invalid';
      }else{
        this.classErro = '';
      }

      this.rappy = 0;
      this.didi = 0;
      this.vuelto = 0;
      this.recibe = 0;
    }else if(tipo == 'q'){
      const searchTerm = even.srcElement.value;

      let suma =  this.efectivo + this.tarjetas +  this.qr;
     
      if(suma != this.total){
        this.classErro = 'is-invalid';
      }else{
        this.classErro = '';
      }

      this.rappy = 0;
      this.didi = 0;
      this.vuelto = 0;
      this.recibe = 0;
    }else if(tipo == 'r'){
      const searchTerm = even.srcElement.value;
      this.efectivo = 0;
      this.tarjetas = 0;
      this.qr = 0;
      this.didi = 0;
      this.vuelto = 0;
      this.recibe = 0;
    }else if(tipo == 'd'){
      const searchTerm = even.srcElement.value;
      this.efectivo = 0;
      this.tarjetas = 0;
      this.qr = 0;
      this.rappy = 0;
      this.vuelto = 0;
      this.recibe = 0;
    }else if(tipo == 're'){
      const searchTerm = even.srcElement.value;
      const tt = this.efectivo;
      this.vuelto = searchTerm - tt;
    }else if(tipo == 'b'){
      const searchTerm = even.srcElement.value;
      
      this.products2 = this.products;
    
      this.products2 = this.products.filter( (element:any) => element.name.toUpperCase().includes( searchTerm.toUpperCase()));
    }
  }

  async facturar() {
    
    if(this.varClient.label == '' && this.varClient.value == ""){
      Report.warning(
        'COMPLETA LA INFORMACIÓN', 
        'debes completar la informacion del cliente', 
        'ok')
      return;
    }else  if(this.varConcepto.label == '' && this.varConcepto.value == ""){
      Report.warning(
        'COMPLETA LA INFORMACIÓN', 
        'debes seleccionar un concepto', 
        'ok')
      return;
    }else if( !this.productsSelect.length ){
      Report.warning(
        'COMPLETA LA INFORMACIÓN', 
        'Agrege productos ala factura', 
        'ok')
      return;
    }

    Confirm.show(
      'CONFIRMAR',
      '¿está seguro que quiere enviar a facturar?',
      'Si',
      'No',
      () => {

        Loading.standard('Loading...');

        let misMetodosNumber = 0;
        let arrMetodos:any = [];

        if(this.efectivo){
          misMetodosNumber++;
          arrMetodos.push({
            valor: this.efectivo,
            idpago:1
          })
        }

        if(this.tarjetas){
          misMetodosNumber++;
          arrMetodos.push({
            valor: this.tarjetas,
            idpago:2
          })
        }

        if(this.qr){
          misMetodosNumber++;
          arrMetodos.push({
            valor: this.qr,
            idpago:3
          })
        }

        if(this.rappy){
          misMetodosNumber++;
          arrMetodos.push({
            valor: this.rappy,
            idpago:4
          })
        }

        if(this.didi){
          misMetodosNumber++;
          arrMetodos.push({
            valor: this.didi,
            idpago:10
          })
        }

        if( misMetodosNumber == 0  ){
          Report.warning(
            'COMPLETA LA INFORMACIÓN', 
            'Seleccione metodo de pago', 
            'ok')
            Loading.remove();
          return;
        }

        const arr = {
          doc:this.arrVarUrl.doc,
          empresa:this.arrVarUrl.empresa,
          prefijo: this.arrVarUrl.prefijo,
          cliente: this.varClient.value,
          subTotal:this.subTotal,
          totalArticulos:this.totalArticulos,
          total: this.total,
          vuelto:this.vuelto,
          recibe:this.recibe,
          concepto: this.varConcepto.value,
          medioPago:arrMetodos
        }

        this.http.savefactura(arr).subscribe((res: any) => {
          Loading.remove();
          this.router.navigate(['prefactura']);
        },
        (err: any)=>{
          Loading.remove();

          Report.warning(
            'ERROR', 
            'Se presento un problema al momento de guardar la factura', 
            'ok')
          /* console.log(err); */
        });
        
      }
    )

  }

}
