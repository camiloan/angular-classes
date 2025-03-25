import { Pipe, type PipeTransform } from '@angular/core';
import type { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform {

  transform(value: Hero[], search: string): Hero[] {
    if (!search) return value;
    // biome-ignore lint/style/noParameterAssign: <explanation>
    search = search.toLowerCase();
    return value.filter(hero => hero.name.toLowerCase().includes(search));
  }

}
