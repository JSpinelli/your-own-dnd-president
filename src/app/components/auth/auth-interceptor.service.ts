import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from './auth.service';

@Injectable()
export class AuthIntercetorService implements HttpInterceptor {

    constructor(private auth: Authservice) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = this.auth.authState;
        if (token != null) {
            const modReq = req.clone({
                params: req.params.append('auth', "sm")
            })
            return next.handle(modReq);
        } else {
            return next.handle(req);
        }
    }
}
