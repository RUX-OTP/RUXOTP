export default function ServicesPage() {
  const services = [
    { id: 1, country: "United States", price: 2.5, code: "+1" },
    { id: 2, country: "United Kingdom", price: 3.0, code: "+44" },
    { id: 3, country: "Nigeria", price: 1.5, code: "+234" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Available Services</h2>
      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{service.country}</h3>
              <p className="text-gray-600">Code: {service.code}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-semibold">${service.price}</p>
              <a
                href={`/buy-number?country=${service.country}&code=${service.code}`}
                className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Buy
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

