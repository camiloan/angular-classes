import { type AfterViewInit, ChangeDetectionStrategy, Component, type ElementRef, viewChild, signal, input } from '@angular/core';


import mapboxgl, { type LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  lngLat = input.required<LngLatLike>();
  zoom = input<number>(14);

  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    const element = this.divElement()?.nativeElement;




    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30,
    });

    new mapboxgl.Marker({ color: 'var(--color-primary)' })
      .setLngLat(this.lngLat())
      .addTo(map);

  }

}
