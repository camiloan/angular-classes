import { ChangeDetectionStrategy, Component, type ElementRef, viewChild, signal, type AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl, { type LngLatLike } from 'mapbox-gl';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';
mapboxgl.accessToken = environment.mapboxKey;


interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([])

  coordinates = signal({
    lng: -73.819358,
    lat: 5.611890
  });

  async ngAfterViewInit() {
    if (!this.divElement) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    const element = this.divElement()?.nativeElement;

    const { lng, lat } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl())
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if (!this.map()) return;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const map = this.map()!;
    const { lng, lat } = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({ color: color })
      .setLngLat([lng, lat])
      .addTo(map)

    const newMarker: Marker = {
      id: uuid(),
      mapboxMarker: mapboxMarker
    }


    this.markers.update(markers => [newMarker, ...markers])

  }

  flyToMaker(lngLat: LngLatLike) {
    console.log('flyToMaker')
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const map = this.map()!;

    marker.mapboxMarker.remove()
    this.markers.set(this.markers().filter((m) => m.id !== marker.id))
  }

}
