import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrefacturaComponent } from './pages/prefactura/prefactura.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrefacturaDetalleComponent } from './pages/prefactura-detalle/prefactura-detalle.component';
import { FacturaComponent } from './pages/prints/factura/factura.component';
import { AperturaComponent } from './pages/apertura/apertura.component';
import { CierreComponent } from './pages/prints/cierre/cierre.component';

const routes: Routes = [
  	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
  	{
		canActivate:[IndexGuard],
		path: 'login', component: LoginComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'home', component: HomeComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'prefactura', component: PrefacturaComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'nav', component: NavbarComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'prefactura_detalle', component: PrefacturaDetalleComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'print_factura', component: FacturaComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'apertura', component: AperturaComponent,
	},
	{
		canActivate:[HomeGuard],
		path: 'cierre', component: CierreComponent,
	},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }