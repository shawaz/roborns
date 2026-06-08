'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { TerraDraw, TerraDrawPolygonMode, TerraDrawSelectMode } from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import { area } from '@turf/area';
import { centroid } from '@turf/centroid';
import { polygon as turfPolygon } from '@turf/helpers';

export interface BoundaryResult {
  polygon: GeoJSON.Polygon;
  center: [number, number];
  areaHectares: number;
}

interface Props {
  center: [number, number];
  zoom?: number;
  onChange: (result: BoundaryResult | null) => void;
}

const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: 'Esri, Maxar, Earthstar Geographics',
    },
  },
  layers: [{ id: 'satellite', type: 'raster', source: 'satellite' }],
};

function fromFeature(geometry: GeoJSON.Polygon): BoundaryResult {
  const poly = turfPolygon(geometry.coordinates);
  const sqMeters = area(poly);
  const areaHectares = Math.round((sqMeters / 10000) * 100) / 100;
  const center = centroid(poly).geometry.coordinates as [number, number];
  return { polygon: geometry, center, areaHectares };
}

const btnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
  padding: '0.55rem 1.1rem', border: '1px solid var(--accent)', color: 'var(--accent)',
  background: 'transparent', cursor: 'pointer',
};

export default function BoundaryMapPicker({ center, zoom = 11, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [hasShape, setHasShape] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [areaHectares, setAreaHectares] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center,
      zoom,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    const draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({ map: map as any }),
      modes: [
        new TerraDrawPolygonMode(),
        new TerraDrawSelectMode({
          flags: {
            polygon: { feature: { draggable: true, coordinates: { midpoints: true, draggable: true, deletable: true } } },
          },
        }),
      ],
    });
    drawRef.current = draw;

    function syncFromSnapshot() {
      const snapshot = draw.getSnapshot();
      const feature = snapshot.find(f => f.geometry.type === 'Polygon');
      if (!feature) {
        setHasShape(false);
        setAreaHectares(null);
        onChangeRef.current(null);
        return;
      }
      const result = fromFeature(feature.geometry as GeoJSON.Polygon);
      setHasShape(true);
      setAreaHectares(result.areaHectares);
      onChangeRef.current(result);
    }

    function handleFinish() {
      setDrawing(false);
      draw.setMode('select');
      syncFromSnapshot();
    }

    map.on('load', () => {
      draw.start();
      draw.setMode('static');
    });

    draw.on('finish', handleFinish);
    draw.on('change', syncFromSnapshot);

    return () => {
      draw.off('finish', handleFinish);
      draw.off('change', syncFromSnapshot);
      draw.stop();
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mapRef.current?.flyTo({ center, zoom, essential: true });
  }, [center[0], center[1]]);

  function startDrawing() {
    const draw = drawRef.current;
    if (!draw) return;
    draw.clear();
    setHasShape(false);
    setAreaHectares(null);
    onChangeRef.current(null);
    draw.setMode('polygon');
    setDrawing(true);
  }

  function clearShape() {
    const draw = drawRef.current;
    if (!draw) return;
    draw.clear();
    draw.setMode('static');
    setHasShape(false);
    setAreaHectares(null);
    setDrawing(false);
    onChangeRef.current(null);
  }

  return (
    <div>
      <div ref={containerRef} style={{ height: 380, border: '1px solid var(--card-border)', position: 'relative' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {!hasShape && !drawing && (
            <button type="button" onClick={startDrawing} style={btnStyle}>
              Draw site boundary →
            </button>
          )}
          {drawing && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
              Click to place each corner · click the first point again to finish
            </span>
          )}
          {hasShape && !drawing && (
            <button type="button" onClick={clearShape} style={btnStyle}>
              Clear &amp; redraw
            </button>
          )}
        </div>
        {areaHectares != null && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>
            Marked area: <strong style={{ color: 'var(--off-white)' }}>{areaHectares.toLocaleString()} ha</strong>
          </span>
        )}
      </div>
    </div>
  );
}
