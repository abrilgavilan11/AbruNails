import { Link } from "react-router-dom";
import { Sparkles, Heart, Award, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Esmaltado Semipermanente",
    description: "Esmalte de larga duración que se mantiene impecable por semanas.",
    link: "/servicios",
  },
  {
    icon: Heart,
    title: "Esculpidas en Gel",
    description: "Extensiones de uñas hermosas y de aspecto natural.",
    link: "/servicios",
  },
  {
    icon: Award,
    title: "Nail Art Personalizado",
    description: "Diseños a medida creados a la perfección para vos.",
    link: "/servicios",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-16 md:py-24 bg-[var(--rose-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--rose-900)] mb-4">
            Servicios Destacados
          </h2>
          <p className="text-lg text-[var(--rose-700)]">
            Descubrí nuestros tratamientos más populares
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-[var(--rose-200)]"
              >
                <div className="w-12 h-12 bg-[var(--rose-100)] rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[var(--rose-600)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--rose-900)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--rose-700)] mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[var(--rose-600)] hover:text-[var(--rose-700)] transition-colors"
                >
                  Ver Detalles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--rose-600)] text-[var(--rose-600)] rounded-full hover:bg-[var(--rose-600)] hover:text-white transition-all"
          >
            Ver Catálogo Completo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}