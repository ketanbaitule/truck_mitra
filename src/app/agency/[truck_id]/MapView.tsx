"use client";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Polyline } from "react-leaflet/Polyline";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function MapView({
  _center,
  _polyline,
}: {
  _center: number[];
  _polyline: number[][];
}) {
  const center: LatLng = new LatLng(_center[0], _center[1]);
  const polyline: LatLng[] = [];
  for (const coordinate of _polyline) {
    polyline.push(new LatLng(coordinate[0], coordinate[1]));
  }
  const limeOptions = { color: "lime" };

  useEffect(() => {
    const timer = setTimeout(() => {
      const lat = 5;
      const long = 5;
      polyline.push(new LatLng(lat, long));
      console.log("polyline");
    });
  }, []);

  return (
    <>
      <MapContainer
        className="h-[80vh] w-full relative"
        center={center}
        zoom={17}
      >
        <TileLayer
          attribution="Made by Team Mission_I_M_Possible"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </>
  );
}
