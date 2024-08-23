import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AgencyPage() {
  const client = createClient();

  const trucks = await client.from("trucks").select();

  return (
    <div className="container mx-auto py-9">
      <h1 className="font-bold text-3xl underline font-sans"> All Trucks </h1>
      <div className="flex flex-wrap gap-6 my-6">
        {trucks.data?.map(async (trucks, index) => {
          const last_trip = (
            await client
              .from("trips")
              .select()
              .eq("vehicle_no", trucks.vehicle_no)
              .eq("isCompleted", true)
              .order("created_at", { ascending: false, nullsFirst: false })
              .limit(1)
          ).data;

          const curr_trip = (
            await client
              .from("trips")
              .select()
              .eq("vehicle_no", trucks.vehicle_no)
              .eq("isCompleted", false)
              .limit(1)
          ).data;

          const data = {
            vehicle_no: trucks.vehicle_no,
            insurance_no: trucks.insurance_no,
            puc_no: trucks.puc_no,
            last_trip:
              last_trip && last_trip!.length > 0
                ? `${last_trip![0].start_loc} to ${last_trip![0].end_loc}`
                : "YET TO HAPPEN",
            curr_trip:
              curr_trip && curr_trip!.length > 0
                ? `${curr_trip![0].start_loc} to ${curr_trip![0].end_loc}`
                : "NO ONGOING TRIP",
          };
          return <TruckCard truck={data} key={index} />;
        })}
      </div>
    </div>
  );
}

function TruckCard({
  truck,
}: {
  truck: {
    vehicle_no: string;
    insurance_no: string;
    puc_no: string;
    last_trip: string;
    curr_trip: string;
  };
}) {
  return (
    <Link
      href={`./agency/${truck.vehicle_no}`}
      className="block w-96 p-6 bg-[#FFDA5F] border border-gray-200 rounded-lg "
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
        {truck.vehicle_no}
      </h5>
      <p className="font-normal text-black/50 space-y-3">
        <b>Current Trip:</b> {truck.curr_trip} <br />
        <b>Last Trip:</b> {truck.last_trip} <br />
        <b>Insurance No:</b> {truck.insurance_no} <br />
        <b>PUC No:</b> {truck.puc_no} <br />
      </p>
    </Link>
  );
}
