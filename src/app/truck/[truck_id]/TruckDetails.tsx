export default function TruckDetails() {
  const truckDetails = {
    vehicle_no: "MH 12 AB 1234",
    curr_trip: "Pune to Mumbai",
    curr_location: "Pune",
    photo: "https://placehold.co/600x400/22FF44/FFFFFF/png",
  };
  return (
    <>
      <div className="flex flex-row justify-between ">
        <h1 className="font-bold text-3xl underline font-sans">
          Truck Details
        </h1>
        <a
          href="#tracking"
          className="bg-[#FF8383] hover:bg-[#FF8383] text-black font-medium py-2 px-4 rounded"
        >
          View Current Location
        </a>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between bg-[#D9D9D9] p-5 rounded">
        <div className="order-2 md:order-1 flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-xl inline">Vehicle Number: </h2>
            <span className="text-lg">{truckDetails.curr_trip}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Current Trip: </h2>
            <span className="text-lg">{truckDetails.curr_location}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Current Location: </h2>
            <span className="text-lg">{truckDetails.vehicle_no}</span>
          </div>
          <div>
            <button className="bg-[#FFDA5F] hover:bg-[#FFDA5F/90] uppercase text-black font-semibold py-2 px-4 rounded">
              View Previous Trips
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 border-2 border-black">
          <img src={truckDetails.photo} alt="Truck" className="w-96 h-60" />
        </div>
      </div>
    </>
  );
}
