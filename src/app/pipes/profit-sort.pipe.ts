import { Pipe, PipeTransform } from '@angular/core';
import { Profit } from '../models/profit.model';

@Pipe({
    name: 'profitSort'
})
export class ProfitSortPipe implements PipeTransform {

    transform(items: Profit[]): Profit[] {
        return items.slice().sort((a, b) => {
            if (a.type === 'ingreso') {
                return -1;
            } else {
                return 1;
            }
        });
    }

}
