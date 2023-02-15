import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserHelper } from 'src/app/shared/helpers/user';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(private router: Router) { }

  public canActivate(): boolean {

    if (UserHelper.isConnect()) {
      if (UserHelper.getUser().role === 'user'){
        this.router.navigate(['/user']);
      }
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
