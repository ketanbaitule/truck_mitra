import { createClient } from "@/utils/supabase/client";
import MapView from "./MapView";

export default async function LocationHistory() {
  const vehicle_no = "MH31AB2308";
  // const polyline = [
  //   [21.096196458851442, 78.97859335333851],
  //   [21.095586457851342, 78.97859335333851],
  //   [21.095156456851242, 78.97859335333851],
  // ];
  //
  const client = createClient();
  const polyline_ = (
    await client
      .from("locations")
      .select()
      .eq("truck_id", vehicle_no)
      .order("timestamp", { ascending: false, nullsFirst: false })
      .limit(20)
  ).data;

  const _polyline = [];

  if (polyline_) {
    for (const line of polyline_) {
      _polyline.push([line["lat"] as number, line["long"] as number]);
    }
  }

  return (
    <div className="space-y-9">
      <h1 className="font-bold text-3xl underline font-sans">
        Location History
      </h1>
      <div className="flex flex-row">
        <div>
          <b>From: </b>
          <input type="datetime-local" />
        </div>
        <div className="ml-52">
          <b>To: </b>
          <input type="datetime-local" />
        </div>
      </div>
      <div id="map">
        <MapView _polyline={_polyline} vehicle_no={vehicle_no} from="" to="" />
      </div>
    </div>
  );
}
