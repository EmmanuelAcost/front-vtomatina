import { Component } from '@angular/core';
import { UserGlobal } from '../../services/userGlobal.service';

import { Users, UserInter } from 'src/app/interfaces/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public infoUser: any;

  constructor(private userGlobal: UserGlobal) {}

  ngOnInit() {
    this.viewUser();
  }

  async viewUser() {
    await this.userGlobal.addNewUser();
    await this.userGlobal.users.subscribe((res: any) => {
      this.infoUser = res;
      localStorage.setItem("idB",this.infoUser.idstore)
    });
  }
}
