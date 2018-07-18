import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})

export class StatusPipe implements PipeTransform {
    transform(value: string, args?: any): string {
        if (value === 'fail') {
            return 'red';
        } else {
            if (value === 'waiting') {
                return 'grey';
            } else {
                if (value === 'pass') {
                    return 'green';
                } else {
                    return 'black';
                }
            }
        }
    }
}
