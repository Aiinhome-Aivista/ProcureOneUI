import { Component, OnInit, OnDestroy, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import * as L from 'leaflet';

interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-map-view',
  imports: [],
  templateUrl: './map-view.html',
  styleUrl: './map-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapView implements OnInit, OnDestroy {
  private map: L.Map | null = null;
  readonly isMapLoaded = signal(false);

  private readonly markers: MapMarker[] = [
    {
      lat: 22.5448,
      lng: 88.3426,
      title: 'Victoria Memorial',
      description: 'Victoria Memorial, Kolkata - Iconic white marble monument'
    },
    {
      lat: 22.5726,
      lng: 88.3639,
      title: 'Howrah Bridge',
      description: 'Howrah Bridge - Famous cantilever bridge over Hooghly River'
    },
    {
      lat: 22.5697,
      lng: 88.3697,
      title: 'Dakshineswar Temple',
      description: 'Dakshineswar Kali Temple - Historic Hindu temple'
    },
    {
      lat: 22.5564,
      lng: 88.3518,
      title: 'Indian Museum',
      description: 'Indian Museum - Oldest and largest museum in India'
    }
  ];

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initializeMap(): void {
    // Initialize map centered on Victoria Memorial
    this.map = L.map('map', {
      center: [22.5448, 88.3426],
      zoom: 14,
      zoomControl: true,
      attributionControl: true
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 3
    }).addTo(this.map);

    // Add markers for all locations
    this.markers.forEach(marker => {
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      L.marker([marker.lat, marker.lng], { icon })
        .addTo(this.map!)
        .bindPopup(`<strong>${marker.title}</strong><br>${marker.description}`);
    });

    this.isMapLoaded.set(true);
  }
}
