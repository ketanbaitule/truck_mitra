import z from "zod";
import TruckDetails from "./TruckDetails";
import DriverDetails from "./DriverDetails";
import LocationHistory from "./LocationHistory";
import { createClient } from "@/utils/supabase/server";

async function TruckPage({
  params: { truck_id },
}: {
  params: { truck_id: string };
}) {
  const client = createClient();

  const truck = (
    await client.from("trucks").select().eq("vehicle_no", truck_id)
  ).data![0];

  const last_trip = (
    await client
      .from("trips")
      .select()
      .eq("vehicle_no", truck.vehicle_no)
      .eq("isCompleted", true)
      .order("created_at", { ascending: false, nullsFirst: false })
      .limit(1)
  ).data;

  const curr_trip = (
    await client
      .from("trips")
      .select()
      .eq("vehicle_no", truck.vehicle_no)
      .eq("isCompleted", false)
      .limit(1)
  ).data;

  truck.last_trip =
    last_trip && last_trip!.length > 0
      ? `${last_trip![0].start_loc} to ${last_trip![0].end_loc}`
      : "YET TO HAPPEN";
  truck.curr_trip =
    curr_trip && curr_trip!.length > 0
      ? `${curr_trip![0].start_loc} to ${curr_trip![0].end_loc}`
      : "NO ONGOING TRIP";

  return (
    <div className="container mx-auto space-y-10 my-10">
      <TruckDetails truck={truck} />

      <DriverDetails />

      <LocationHistory />
    </div>
  );
}

export default TruckPage;
