import { createClient } from "@/utils/supabase/server";

export default async function DriverDetails({
  driver_id,
}: {
  driver_id: string;
}) {
  const client = createClient();
  const driverDetails = (
    await client.from("driver").select().eq("driver_id", driver_id)
  ).data![0];

  console.log(driverDetails);

  return (
    <>
      <div className="flex flex-row justify-between ">
        <h1 className="font-bold text-3xl underline font-sans">Driver Info</h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between bg-[#D9D9D9] p-5 rounded">
        <div className="order-2 md:order-1 flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-xl inline">Driver Name: </h2>
            <span className="text-lg">{driverDetails.driver_name}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Contact No: </h2>
            <span className="text-lg">{driverDetails.driver_contact}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Driver License: </h2>
            <span className="text-lg">{driverDetails.driver_license}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Driver Aadhar Card: </h2>
            <span className="text-lg">{driverDetails.driver_aadhar}</span>
          </div>
          <div>
            <button className="bg-[#FFDA5F] hover:bg-[#FFDA5F/90] uppercase text-black font-semibold py-2 px-4 rounded">
              View Allowances
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 border-2 border-black">
          <img src={driverDetails.photo} alt="Truck" className="w-96 h-60" />
        </div>
      </div>
    </>
  );
}
