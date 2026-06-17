import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuaWN1cmUlMjBuYWlsJTIwYXJ0JTIwY2xvc2V8ZW58MXx8fHwxNzgxMDM3Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Arte elegante en uñas"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--rose-900)]/70 to-[var(--rose-900)]/40"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Realza la Belleza de tus Manos
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-[var(--rose-100)] max-w-xl">
            Experimenta el arte del cuidado premium de uñas, donde la elegancia se encuentra con la excelencia.
          </p>
          <Link
            to="/reservar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--rose-600)] text-white rounded-full hover:bg-[var(--rose-700)] transition-all transform hover:scale-105 shadow-lg"
          >
            Reservar Turno
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}