import { Component, signal, computed } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map-view',
  imports: [GoogleMap, MapMarker],
  templateUrl: './map-view.html',
  styleUrl: './map-view.css',
})
export class MapView {
  // Victoria Memorial, Kolkata coordinates
  private readonly victoriaMemorialLat = 22.5448;
  private readonly victoriaMemorialLng = 88.3426;

  // Map configuration using signals
  center = signal<google.maps.LatLngLiteral>({
    lat: this.victoriaMemorialLat,
    lng: this.victoriaMemorialLng
  });

  zoom = signal<number>(14);

  // Map options for better styling
  mapOptions = computed<google.maps.MapOptions>(() => ({
    center: this.center(),
    zoom: this.zoom(),
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
      }
    ]
  }));

  // Marker position
  markerPosition = signal<google.maps.LatLngLiteral>({
    lat: this.victoriaMemorialLat,
    lng: this.victoriaMemorialLng
  });

  // Marker options with label
  markerOptions = signal<google.maps.MarkerOptions>({
    draggable: false,
    title: 'Victoria Memorial, Kolkata',
    label: {
      text: 'Victoria Memorial, Kolkata',
      color: '#1e293b',
      fontSize: '14px',
      fontWeight: 'bold',
      className: 'map-marker-label'
    }
  });
}
