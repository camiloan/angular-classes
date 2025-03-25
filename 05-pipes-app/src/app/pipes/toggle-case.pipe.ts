import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase',
})
export class ToggleCasePipe implements PipeTransform {

  transform(value: string, upper = true): string {
    return upper ? value.toUpperCase() : value.toLowerCase();
  }

}
