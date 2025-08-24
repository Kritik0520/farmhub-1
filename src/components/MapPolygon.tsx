import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";

interface PolygonPoint {
  lat: number;
  lng: number;
}

interface MapPolygonProps {
  onPolygonComplete: (coords: PolygonPoint[]) => void;
}

const MapPolygon: React.FC<MapPolygonProps> = ({ onPolygonComplete }) => {
  useEffect(() => {
    const map = L.map("map", {
      center: [28.6139, 77.209], // Default center (Delhi, India)
      zoom: 13,
    });

    // ✅ Satellite tiles (Esri World Imagery)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    ).addTo(map);

    // ✅ Polygon draw controls
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        circle: false,
        marker: false,
        rectangle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    // ✅ Handle polygon creation without recentering
    map.on(L.Draw.Event.CREATED, (event: any) => {
      // Save current view before Leaflet tries to auto-fit
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();

      const layer = event.layer;

      // Keep only one polygon → clear previous ones
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      if (event.layerType === "polygon") {
        const coords: PolygonPoint[] = layer
          .getLatLngs()[0]
          .map((point: any) => ({ lat: point.lat, lng: point.lng }));
        onPolygonComplete(coords);
      }

      // Restore view → stops unwanted recenter
      map.setView(currentCenter, currentZoom);
    });

    return () => {
      map.remove();
    };
  }, [onPolygonComplete]);

  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "70%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default MapPolygon;
