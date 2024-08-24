"use client";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Polyline } from "react-leaflet/Polyline";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { createClient } from "@/utils/supabase/client";

export default function MapView({
  _polyline,
  vehicle_no,
  from,
  to,
}: {
  _polyline: number[][];
  vehicle_no: string;
  from: string;
  to: string;
}) {
  const [polyline, setPolyLine] = useState<LatLng[]>([]);
  useEffect(() => {
    let t1 = client
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "locations" },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.new.truck_id == vehicle_no)
            setPolyLine((old) => {
              const updatedPolyLine = [
                new LatLng(payload.new.lat, payload.new.long),
                ...old,
              ];
              return updatedPolyLine;
            });
        },
      )
      .subscribe();
    console.log("t1", t1);
  }, []);
  if (_polyline.length == 0) return <>No Location Data Store </>;
  const client = createClient();

  let meanLat = 0;
  let meanLong = 0;
  for (const coordinate of _polyline) {
    meanLat += coordinate[0];
    meanLong += coordinate[1];

    polyline.push(new LatLng(coordinate[0], coordinate[1]));
  }

  meanLat = meanLat / _polyline.length;
  meanLong = meanLong / _polyline.length;

  const limeOptions = { color: "lime" };

  return (
    <>
      <MapContainer
        className="h-[80vh] w-full relative"
        center={new LatLng(meanLat, meanLong)}
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
