export default function DriverDetails() {
  const driverDetails = {
    name: "Raju Yadav",
    contact: "9876543210",
    driver_license: "MH123456789",
    driver_aadhar: "123456789012",
    photo: "https://placehold.co/600x400/22FF44/FFFFFF/png",
  };
  return (
    <>
      <div className="flex flex-row justify-between ">
        <h1 className="font-bold text-3xl underline font-sans">Driver Info</h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between bg-[#D9D9D9] p-5 rounded">
        <div className="order-2 md:order-1 flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-xl inline">Driver Name: </h2>
            <span className="text-lg">{driverDetails.name}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl inline">Contact No: </h2>
            <span className="text-lg">{driverDetails.contact}</span>
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
