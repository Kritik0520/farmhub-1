import React, { useState } from "react";
import MapPolygon from "../components/MapPolygon";
import FarmerForm from "../components/FarmerForm";

interface PolygonPoint {
  lat: number;
  lng: number;
}

function FieldMapping() {
  const [polygon, setPolygon] = useState<PolygonPoint[]>([]);
  const [farmerData, setFarmerData] = useState<any>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mark Your Field</h2>
      <MapPolygon onPolygonComplete={(coords) => setPolygon(coords)} />

      <FarmerForm onSubmit={(data) => setFarmerData(data)} />

      {polygon.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Polygon Coordinates:</h3>
          <pre>{JSON.stringify(polygon, null, 2)}</pre>
        </div>
      )}

      {farmerData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Farmer Inputs:</h3>
          <p>Soil: {farmerData.soil}</p>
          <p>Crop: {farmerData.crop}</p>
          <p>Sow Date: {farmerData.sowDate}</p>
        </div>
      )}
    </div>
  );
}

export default FieldMapping;
