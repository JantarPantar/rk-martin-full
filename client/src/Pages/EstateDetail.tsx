import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useParams } from "react-router-dom";
import L from "leaflet";
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41], // důležité pro správné umístění markeru
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Property {
  id: number;
  title: string;
  street: string;
  city: string;
  latitude: number;
  longtitude: number;
  size_m2: number;
  energy_rating: string;
  price: number;
  description: string;
  images: any[];
}

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });


  

  useEffect(() => {
    fetch(`http://localhost/api/property/${id}?format=json`)
        .then((res) => {
        if (!res.ok) throw new Error("Chyba při načítání dat");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Chyba při odesílání.");
  
      alert("Zpráva byla úspěšně odeslána.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Nepodařilo se odeslat zprávu.");
    }
  };
  

  if (loading) return <p>Načítám data...</p>;
  if (error) return <p>Chyba: {error}</p>;
  if (!property) return <p>Nemovitost nebyla nalezena.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Levá část - galerie a popis */}
        <div className="w-full lg:w-2/3">
          {/* Galerie */}
          <div className="mb-6 relative">
            <img
              src={property.images[currentImageIndex].image_url}
              alt={`Property image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="grid grid-cols-5 gap-2 mt-4">
              {property.images.map((img:any, i) => (
                <img
                  key={i}
                  src={img.image_url}
                  alt={`Thumbnail ${i + 1}`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                    i === currentImageIndex ? "border-4 border-yellow-400" : "opacity-70"
                  }`}
                  onClick={() => setCurrentImageIndex(i)}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{property.title}</h1>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div>
              <p className="text-xl text-gray-600 font-medium">Rozloha: {property.size_m2} m²</p>
              <p className="text-xl text-gray-600 font-medium">Energetická náročnost: {property.energy_rating}</p>
              <p className="text-xl text-gray-600 font-medium">
                Cena: {property.price.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}
              </p>
            </div>
            <div className="flex items-center text-gray-500">
              <span>{property.street}, {property.city}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Popis nemovitosti</h3>
            <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
  {/* Formulář */}
  <div className="bg-white shadow-xl p-8 rounded-2xl mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Kontaktní formulář</h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Jméno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Zpráva
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
      >
        Odeslat zprávu
      </button>
    </form>
  </div>

  {/* Mapa */}
  <div className="bg-white shadow-xl p-6 rounded-2xl">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Lokace</h3>
    {property.latitude && property.longtitude ? (
      <MapContainer
        center={[property.latitude, property.longtitude]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "250px", width: "100%", borderRadius: "1rem", overflow: "hidden" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[property.latitude, property.longtitude]}>
          <Popup>{property.title}</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <p className="text-gray-500">Souřadnice nejsou dostupné</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default PropertyDetail;
