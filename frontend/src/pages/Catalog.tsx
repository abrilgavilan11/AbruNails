import { useEffect, useState } from 'react';

interface Service {
  id: string | number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export default function Catalog() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services');
        if (!response.ok) throw new Error('Error al conectar con la API');
        
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error trayendo los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center bg-rose-50">
        <p className="text-xl text-rose-500 font-medium animate-pulse">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="bg-rose-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-rose-600 mb-3">Nuestro Catálogo</h1>
          <p className="text-gray-600 text-lg">Explorá nuestros servicios y preparate para brillar.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length === 0 ? (
            <p className="text-center col-span-2 text-gray-500">Todavía no hay servicios disponibles.</p>
          ) : (
            services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800">{service.name}</h2>
                    <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <span className="mr-2">⏱️</span> 
                    {service.duration} min
                  </div>
                  <span className="text-2xl font-black text-rose-500">
                    ${service.price.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}