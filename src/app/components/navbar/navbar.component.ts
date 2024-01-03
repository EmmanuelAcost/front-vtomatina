import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGlobal } from '../../services/userGlobal.service';

import { Users,UserInter } from 'src/app/interfaces/users';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit  {
  public showNavbar: boolean = true;
  public showProfileOptions: boolean = false;
  public isMenuOpen: boolean = false;
  public isSubmenuOpen: boolean[] = [false, false, false];
  public menuOptions: any[] = [
   /*  {
      name: 'Sub Menu',
      icon: 'ti ti-home',
      isSubmenu: true,
      url: 'dashboard',
      subOptions: ['Subopción 1', 'Subopción 2'],
    }, */
    {
      name: 'Home',
      icon: 'ti ti-home',
      isSubmenu: false,
      route: 'home',
    },
    {
      name: 'Facturacion',
      icon: 'ti ti-home',
      isSubmenu: false,
      route: 'factura',
    },
    {
      name: 'Apertura',
      icon: 'ti ti-home',
      isSubmenu: false,
      route: 'apertura',
    },
    {
      name: 'Articulos',
      icon: 'ti ti-home',
      isSubmenu: false,
      route: 'articulo',
    },
  ];

  public user:Users = UserInter;

  constructor(
    private router: Router, 
    private userGlobal:UserGlobal,
    private storageService:StorageService
    ) {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }

  ngOnInit() {
    this.viewUser();
  }

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
    setTimeout(() => {
      this.showProfileOptions = !this.showProfileOptions;
    }, 5000);
  }

  async logout() {
    this.storageService.clear();
    this.router.navigate(['login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleSubmenu(index: number) {
    this.isSubmenuOpen[index] = !this.isSubmenuOpen[index];
  }
  isOptionActive(option: any): boolean {
    if (option.isSubmenu) {
      return option.subOptions.some((subOption: any) =>
        this.router.url.includes(subOption)
      );
    } else {
      return this.router.url.includes(option.url); // Utiliza la propiedad "url" en lugar de "name"
    }
  }

  async viewUser() {
    await this.userGlobal.addNewUser();
    await this.userGlobal.users.subscribe((res:any)=>{
      this.user = res;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }


}
