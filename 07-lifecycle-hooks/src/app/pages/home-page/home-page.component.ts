import { afterNextRender, afterRender, ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleComponent } from '../../components/title/title.component';



export const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1)}`, 'color:#bada55');
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomePageComponent {


  traditionalProperty = 'Camilo';
  signalProperty = signal('Camilo');

  constructor() {
    console.log('HomePageComponent constructor llamado');

    /*     setTimeout(() => {
          this.signalProperty.set('Camilo Bolaños Andrade');
          // this.traditionalProperty = 'Camilo Bolaños Andrade'; // No cambiará el valor del signal
        }, 3000); */
  }

  changeTraditional() {
    this.traditionalProperty = 'Camilo Bolaños';
  }

  changeSignal() {
    this.signalProperty.set('Camilo Bolaños');
  }

  basicEffect = effect((onCleanup) => {
    log('basicEffect', "Runs once after Angular has initialized all the component's inputs.")
    onCleanup(() => {
      log('basicEffect onCleanup', "Runs once after Angular has destroyed all the component's inputs.")
    })
  })

  ngOnInit() { log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.") }
  ngOnChanges() { log('ngOnChanges', "Runs every time the component's inputs have changed.") }
  ngDoCheck() { log('ngDoCheck', "Runs every time this component is checked for changes.") }
  ngAfterContentInit() { log('ngAfterContentInit', "Runs once after the component's content has been initialized.") }
  ngAfterContentChecked() { log('ngAfterContentChecked', "Runs every time this component content has been checked for changes.") }
  ngAfterViewInit() { log('ngAfterViewInit', "Runs once after the component's view has been initialized.") }
  ngAfterViewChecked() { log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.") }
  ngOnDestroy() { log('ngOnDestroy', "Runs once before the component is destroyed.") }

  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRenderEffect', "Runs once the next time that all components have been rendered to the DOM.")
  })

  afterRender = afterRender(() => {
    log('afterRender', "Runs every time all components have been rendered to the DOM.")
  })
}
