import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerService {

    public log(output: string) {
        console.log(output);
    }
}
