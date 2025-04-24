import LocationMap from "@/lib/LocationMap";

const ComplaintDetails = ({ complaint }) => {
  const Latitude = 22.7195687;

  const Longitude = 75.8577258;
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-bold">{complaint.title}</h2>
      <p>{complaint.description}</p>

      <LocationMap
        latitude={parseFloat(Latitude)}
        longitude={parseFloat(Longitude)}
      />
    </div>
  );
};
