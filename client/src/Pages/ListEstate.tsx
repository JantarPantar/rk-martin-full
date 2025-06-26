import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const filters = [
  { label: "Byty", type: 1 },
  { label: "Domy", type: 2 },
  { label: "Pozemky", type: 3 },
  { label: "Komerční", type: 4 },
  { label: "Ostatní", type: 5 },
];

type Listing = {
  id: number;
  title: string;
  street: string;
  city: string;
  price: number;
  images: any[];
  type: number;
};

const ListEstate = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/api/property/list?format=json")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  const filteredListings = selectedFilter
    ? listings.filter((listing) => listing.type === selectedFilter)
    : listings;

  const getTagLabel = (type: number): string => {
    return filters.find((f) => f.type === type)?.label || "Neznámý";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.type}
            onClick={() =>
              setSelectedFilter(
                selectedFilter === filter.type ? null : filter.type
              )
            }
            className={`rounded-full px-4 py-2 font-semibold flex items-center gap-2 transition-colors duration-200 ${
              selectedFilter === filter.type
                ? "bg-[#F9DC5C] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            onClick={() => navigate(`/detail/${listing.id}`)}
            className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <img
              src={listing.images[0].image_url}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-semibold">
                {getTagLabel(listing.type)}
              </span>
              <h3 className="text-lg font-semibold mt-2">{listing.title}</h3>
              <p className="text-gray-500">{`${listing.street}, ${listing.city}`}</p>
              <p className="text-gray-900 font-bold mt-2">
                {listing.price
                  ? new Intl.NumberFormat("cs-CZ", {
                      style: "currency",
                      currency: "CZK",
                    }).format(listing.price)
                  : "Cena na vyžádání"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEstate;
