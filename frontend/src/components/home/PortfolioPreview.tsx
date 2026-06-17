import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const portfolioImages = [
  "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1733172072205-7fbe8e8c50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1780402695869-49cfb47f9f9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

export default function PortfolioPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--rose-900)] mb-4">
            Nuestra Galería
          </h2>
          <p className="text-lg text-[var(--rose-700)]">
            Un vistazo a nuestros hermosos trabajos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={image}
                alt={`Trabajo de nail art ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/reservar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--rose-600)] text-white rounded-full hover:bg-[var(--rose-700)] transition-all transform hover:scale-105 shadow-lg"
          >
            Reserva tu Turno
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}