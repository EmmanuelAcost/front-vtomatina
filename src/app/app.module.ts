import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrefacturaComponent } from './pages/prefactura/prefactura.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FacturaComponent } from './pages/prints/factura/factura.component';
import { AperturaComponent } from './pages/apertura/apertura.component';
import { CierreComponent } from './pages/prints/cierre/cierre.component';
import { FacturaViewComponent } from './pages/factura/factura.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { DetallefacturaComponent } from './pages/detallefactura/detallefactura.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrefacturaComponent,
    NavbarComponent,
    FacturaComponent,
    AperturaComponent,
    CierreComponent,
    FacturaViewComponent,
    ArticuloComponent,
    DetallefacturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
