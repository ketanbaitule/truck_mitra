"use client";
import { createClient } from "@/utils/supabase/client";
import { timeStamp } from "console";
import { useEffect, useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 999,
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#app");

interface LatLangTimestamp {
  timestamp: string;
  lat: number;
  long: number;
}

function LiveLocationHistoryModal({
  vehicle_no,
  _locations,
}: {
  vehicle_no: string;
  _locations: LatLangTimestamp[];
}) {
  const client = createClient();
  const [locations, setLocations] = useState<any>(_locations);

  useEffect(() => {
    let t1 = client
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "locations" },
        (payload) => {
          console.log("Location received!", payload);
          if (payload.new.truck_id == vehicle_no)
            setLocations((old: LatLangTimestamp[]) => {
              const updatedPolyLine = [
                {
                  timestamp: payload.new.timestamp,
                  lat: payload.new.lat,
                  long: payload.new.long,
                },
                ...old,
              ];
              return updatedPolyLine;
            });
        },
      )
      .subscribe();
    console.log("t1", t1);
  }, []);

  return (
    <div>
      <table className="w-full">
        <tr>
          <th>Timestamp </th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
        {locations &&
          locations.length > 0 &&
          locations.map((location: LatLangTimestamp, index: number) => {
            return (
              <tr key={index} className="w-full py-4">
                <td className="w-1/3 text-center">
                  {new Date(location.timestamp)
                    .toUTCString()
                    .substring(0, "Sat, 24 Aug 2024 08:17:28 GMT".length - 4) +
                    " IST"}
                </td>
                <td className="w-1/3 text-center">{location.lat}</td>
                <td className="w-1/3 text-center">{location.long}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default LiveLocationHistoryModal;
