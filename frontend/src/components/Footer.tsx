import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--rose-900)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-lg">Abru Nails</span>
            </div>
            <p className="text-[var(--rose-300)] text-sm">
              Salón de uñas y manicuría premium, dedicado a llevar la elegancia a tus manos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <div className="flex flex-col gap-2">
              <Link to="/servicios" className="text-[var(--rose-300)] hover:text-white transition-colors text-sm">
                Servicios y Precios
              </Link>
              <Link to="/reservar" className="text-[var(--rose-300)] hover:text-white transition-colors text-sm">
                Reservar Turno
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="text-[var(--rose-300)] text-sm space-y-1">
              <p>Calle Principal 123</p>
              <p>Plottier, Neuquén</p>
              <p className="mt-2">+54 9 299 123-4567</p>
            </div>
            <div className="mt-4">
              <Link
                to="/admin/login"
                className="text-xs text-[var(--rose-400)] hover:text-[var(--rose-300)] transition-colors"
              >
                Acceso Portal Admin
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--rose-800)] mt-8 pt-8 text-center text-sm text-[var(--rose-400)]">
          <p>&copy; 2026 Abru Nails. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}