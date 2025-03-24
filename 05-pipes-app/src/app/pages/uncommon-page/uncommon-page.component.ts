import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';


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
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe],
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

}
