import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { UserHelper } from 'src/app/shared/helpers/user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [MessageService]
})
export class SideBarComponent implements OnInit {

  index: number | null | undefined;
  currentMenu: HTMLElement | undefined | null;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.changeTheme();
  }

  changeTheme(): void{
    const sideBar = $('.side-bar');

    $('.close').on('click', () => {
      sideBar.removeClass('sideBar-show');
    });
    $('.menu-target').on('click', () => {
      sideBar.addClass('sideBar-show');
    });


    $('.has-sub').on('click', (e) => {
      e.preventDefault();
      e.currentTarget.classList.toggle('show');
      if (this.currentMenu === e.currentTarget) {
        this.currentMenu = null;
      }else{
        this.currentMenu?.classList.remove('show');
        this.currentMenu = e.currentTarget;
      }
    });
  }

  disconnect(): void{
    UserHelper.disconect();
    this.messageService.add({ 
      severity: 'success', 
      summary: 'success', 
      detail: 'login success ', 
      life: 3000 
    });
    this.router.navigateByUrl('/auth');
  }

}
