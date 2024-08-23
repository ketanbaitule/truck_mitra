import MapView from "./MapView";

export default function LocationHistory() {
  const center = [21.095156456851242, 78.97859335333851];
  const polyline = [
    [21.096196458851442, 78.97859335333851],
    [21.095586457851342, 78.97859335333851],
    [21.095156456851242, 78.97859335333851],
  ];

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
        <MapView _center={center} _polyline={polyline} />
      </div>
    </div>
  );
}
