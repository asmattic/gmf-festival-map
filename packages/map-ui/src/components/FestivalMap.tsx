'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import '../tokens/gmf-design-tokens.css';

import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  poiCategoryColor,
  type MapPoi,
  type PoiCategory,
  type Stage,
  type VenueOverlay
} from '@gmf/map-core';
import { MapFilters } from './MapFilters';
import { MapLegend } from './MapLegend';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface Props {
  pois: MapPoi[];
  stages?: Stage[];
  overlay?: VenueOverlay | null;
  showLegend?: boolean;
  height?: number;
  /** Center as GeoJSON-style [lng, lat], same as POI coordinates in data */
  center?: [number, number];
  zoom?: number;
}

export function FestivalMap({
  pois,
  stages = [],
  overlay,
  showLegend = true,
  height = 640,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM
}: Props) {
  const [lng0, lat0] = center;
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const overlayLayerRef = useRef<L.ImageOverlay | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selected, setSelected] = useState<PoiCategory[]>([]);

  const visiblePois = useMemo(() => {
    if (selected.length === 0) return pois;
    return pois.filter((p) => selected.includes(p.category));
  }, [pois, selected]);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) return;

    const map = L.map(mapNodeRef.current, {
      scrollWheelZoom: true,
      zoomControl: true
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.setView([lat0, lng0], zoom);
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapRef.current = map;
    setMapReady(true);

    return () => {
      setMapReady(false);
      overlayLayerRef.current?.remove();
      overlayLayerRef.current = null;
      map.remove();
      mapRef.current = null;
      markersGroupRef.current = null;
    };
    // Initial view only; updates use the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once per container
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    mapRef.current?.setView([lat0, lng0], zoom);
  }, [lat0, lng0, zoom, mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    mapRef.current?.invalidateSize();
  }, [height, mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    const map = mapRef.current;
    if (!map) return;

    if (overlayLayerRef.current) {
      map.removeLayer(overlayLayerRef.current);
      overlayLayerRef.current = null;
    }

    if (overlay?.type === 'image' && overlay.bounds) {
      const [sw, ne] = overlay.bounds;
      const bounds = L.latLngBounds(L.latLng(sw[1], sw[0]), L.latLng(ne[1], ne[0]));
      const layer = L.imageOverlay(overlay.url, bounds, {
        opacity: 0.85,
        interactive: false
      }).addTo(map);
      overlayLayerRef.current = layer;
    }
  }, [overlay, mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    const group = markersGroupRef.current;
    if (!group) return;

    group.clearLayers();
    for (const poi of visiblePois) {
      const [plng, plat] = poi.coordinates;
      const fill = poiCategoryColor(poi.category);
      const marker = L.circleMarker([plat, plng], {
        radius: 7,
        fillColor: fill,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.92
      });
      const desc = poi.description
        ? `<br><span style="opacity:.85">${escapeHtml(poi.description)}</span>`
        : '';
      marker.bindPopup(
        `<strong>${escapeHtml(poi.name)}</strong><br><span style="text-transform:capitalize">${escapeHtml(poi.category)}</span>${desc}`
      );
      marker.addTo(group);
    }

    void stages;
  }, [visiblePois, stages, mapReady]);

  function toggleCategory(category: PoiCategory) {
    setSelected((prev: PoiCategory[]) =>
      prev.includes(category) ? prev.filter((x: PoiCategory) => x !== category) : [...prev, category]
    );
  }

  return (
    <div className="gmf-map-shell">
      <MapFilters selected={selected} onToggle={toggleCategory} />
      {showLegend ? <MapLegend /> : null}
      <div ref={mapNodeRef} className="gmf-map-canvas" style={{ width: '100%', height }} />
    </div>
  );
}
