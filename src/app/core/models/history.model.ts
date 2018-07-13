import { Data } from '@angular/router';

export class History {
    constructor(
        public id?: number,
        public userId?: number,
        public deal?: number,
        public data?: Data,
        public result?: string
    ) {}
}
