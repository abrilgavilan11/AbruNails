import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

interface Service {
  name: string;
  duration: string;
  description: string;
  price: string;
  image?: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export default function Catalog() {
  const categories: ServiceCategory[] = [
    {
      id: "manos",
      title: "Manos",
      services: [
        {
          name: "Manicuría Clásica",
          duration: "45 min",
          description: "Cuidado tradicional de uñas con limado, repujado de cutículas y esmaltado común.",
          price: "$15.000",
          image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        },
        {
          name: "Esmaltado Semipermanente",
          duration: "60 min",
          description: "Esmaltado en gel de larga duración que mantiene su brillo intacto por hasta 3 semanas.",
          price: "$18.000",
          image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        },
        {
          name: "Esculpidas en Gel / Acrílico",
          duration: "120 min",
          description: "Set completo de extensiones esculpidas con el largo y formato de tu elección.",
          price: "$25.000",
          image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        },
      ],
    },
    {
      id: "pies",
      title: "Pies",
      services: [
        {
          name: "Belleza de Pies Clásica",
          duration: "60 min",
          description: "Cuidado completo con exfoliación, masajes y esmaltado tradicional.",
          price: "$18.000",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzJd1wEbXVZYaeCKK2pdlV2QJnCc8M2hBqzw&s",
        },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1}>Servicios y Precios</Title>
          <p className="text-lg text-[var(--rose-700)] max-w-2xl mx-auto">
            Descubrí nuestro menú completo de cuidados premium, diseñados para resaltar la belleza de tus manos y pies.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-20">
              <div className="bg-gradient-to-r from-[var(--rose-600)] to-[var(--rose-500)] rounded-t-2xl px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>
              
              <div className="bg-[var(--rose-50)] p-4 sm:p-6 rounded-b-2xl border-x border-b border-[var(--rose-200)]">
                {category.services.map((service, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow mb-6 last:mb-0">
                    <div className="flex flex-col sm:flex-row h-full">
                      {/* Contenedor de la Imagen */}
                      {service.image && (
                        <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Contenido del Servicio */}
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
                            <Title level={3} className="!mb-0 text-xl">{service.name}</Title>
                            <p className="text-2xl font-bold text-[var(--rose-600)]">{service.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-[var(--rose-600)] mb-3">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration}</span>
                          </div>
                          
                          <p className="text-[var(--rose-700)] leading-relaxed mb-4">
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="mt-auto flex justify-end">
                          <Link to="/reservar">
                            <Button variant="outline" className="px-4 py-2 text-sm">
                              Reservar este servicio
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-sm border border-[var(--rose-200)] p-8 md:p-12">
          <Title level={2}>¿Lista para lucir unas uñas increíbles?</Title>
          <p className="text-[var(--rose-700)] mb-6 max-w-2xl mx-auto">
            Elegí tu servicio favorito y agendá el horario que mejor te quede. ¡Te esperamos para mimarte!
          </p>
          <Link to="/reservar">
            <Button>Reservar Turno</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}