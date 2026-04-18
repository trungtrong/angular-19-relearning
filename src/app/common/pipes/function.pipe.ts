import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'function',
    standalone: true
})

export class FunctionPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(value: unknown, handler: (...args: any[]) => any, ...args: any[]): any {
        return handler(value, ...args);
    }
}
