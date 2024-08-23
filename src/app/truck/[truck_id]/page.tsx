import z from "zod";
import TruckDetails from "./TruckDetails";
import DriverDetails from "./DriverDetails";
import LocationHistory from "./LocationHistory";

function TruckPage({ params: { truck_id } }: { params: { truck_id: string } }) {
  const truck = z.string().uuid().safeParse(truck_id);
  if (!truck.success) {
    return <div>Truck Not Found or Unauthorized</div>;
  }
  console.log(truck);
  return (
    <div className="container mx-auto space-y-10 my-10">
      <TruckDetails />

      <DriverDetails />

      <LocationHistory />
    </div>
  );
}

export default TruckPage;
