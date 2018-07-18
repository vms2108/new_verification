import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reason'
})

export class IdentificationCausePipe implements PipeTransform {
    transform(value: number, args?: any): string {
        if (value === 2) {
            return 'transaction';
        } else {
            if (value === 3) {
                return 'initiative';
            } else {
                return 'normal';
            }
        }
    }
}
