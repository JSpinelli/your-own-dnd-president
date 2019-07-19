import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthIntercetorService implements HttpInterceptor {

    constructor(private auth: Authservice) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.auth.user
            .pipe(
                take(1),
                exhaustMap(user => {
                    if (user != null) {
                        const modReq = req.clone({
                            params: req.params.append('auth', user.token)
                        })
                        return next.handle(modReq);
                    } else {
                        return next.handle(req);
                    }

                })
            );
    }
}