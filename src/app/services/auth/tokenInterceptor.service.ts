import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UserHelper } from 'src/app/shared/helpers/user';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const user = UserHelper.getUser();
    // console.log(user);
    if(user != null){
      // console.log("inter to set the bearer token header");
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      })
    }

    return next.handle(request);
  }
}
