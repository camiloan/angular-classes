import { effect, Injectable, signal } from '@angular/core';
import type { Character } from '../interfaces/character.interface';


function loadFormLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters')
  return characters ? JSON.parse(characters) : []
}

@Injectable({ providedIn: 'root' })
export class DragonballService {


  characters = signal<Character[]>(loadFormLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()))
    /*     console.log(`Characters count ${this.characters().length}`)*/
  })
  addCharacter(newCharacter: Character) {
    this.characters.update((list) => [...list, newCharacter])
  }
}
