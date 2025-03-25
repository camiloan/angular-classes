import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';


const client1 = {
  name: 'Camilo',
  age: 30,
  gender: 'male',
  address: "Bogotá, Colombia"
}
const client2 = {
  name: 'Melissa',
  age: 33,
  gender: 'female',
  address: "Toronto, Canadá"
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  client = signal(client1)


  invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return;
    }
    this.client.set(client1)

  }


  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos dos clientes esperando',
    other: 'tenemos # clientes esperando'
  })


  clients = signal([
    'Maria',
    'Juan',
    'Camilo',
    'Melissa',
    'Carlos',
    'Luis',
    'Fernando',
    'Diego',
  ])

  deleteClient() {
    this.clients.update((prev) => prev.slice(1))
  }

  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Canadá'
  }


  promiseValue: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hola Mundo')
    }, 1000)
  })


  myObservableTimer = interval(2000).pipe(map((value) => value + 1), tap((value) => console.log('tap:', value)))
}
