import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: string , limit:number) {
        let newtext = value.substr( 0 , limit);
        if (value.length > limit) {
            newtext = newtext + '...';
        }
        return newtext;
    }

}