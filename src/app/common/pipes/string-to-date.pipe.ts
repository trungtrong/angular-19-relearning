import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {
    transform(date: string | number | Date): Date {
        return new Date(date);
    }
}
