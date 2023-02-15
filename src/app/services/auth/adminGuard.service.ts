import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

import { UserHelper } from 'src/app/shared/helpers/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private router: Router) { }

  public canActivate(): boolean {
    if (!UserHelper.isConnect()) {
      this.router.navigateByUrl('/auth');
      return false;
    }else{
      return true;
    }
  }

}
