import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, Lock } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--rose-200)] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--rose-600)]" />
            <span className="font-semibold text-xl text-[var(--rose-900)]">Abru Nails</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-[var(--rose-600)] font-medium"
                  : "text-[var(--rose-700)] hover:text-[var(--rose-600)]"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/servicios"
              className={`transition-colors ${
                isActive("/servicios")
                  ? "text-[var(--rose-600)] font-medium"
                  : "text-[var(--rose-700)] hover:text-[var(--rose-600)]"
              }`}
            >
              Servicios
            </Link>
            <Link
              to="/reservar"
              className="px-6 py-2 bg-[var(--rose-600)] text-white rounded-full hover:bg-[var(--rose-700)] transition-colors"
            >
              Reservar
            </Link>
            <Link
              to="/admin/login"
              title="Portal Admin"
              className={`p-2 rounded-full transition-colors ${
                isActive("/admin/login")
                  ? "bg-[var(--rose-100)] text-[var(--rose-600)]"
                  : "text-[var(--rose-400)] hover:text-[var(--rose-600)] hover:bg-[var(--rose-50)]"
              }`}
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[var(--rose-700)] cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--rose-200)]">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg ${
                  isActive("/")
                    ? "bg-[var(--rose-100)] text-[var(--rose-600)] font-medium"
                    : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/servicios"
                className={`px-4 py-2 rounded-lg ${
                  isActive("/servicios")
                    ? "bg-[var(--rose-100)] text-[var(--rose-600)] font-medium"
                    : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                to="/reservar"
                className="px-4 py-2 bg-[var(--rose-600)] text-white rounded-lg text-center hover:bg-[var(--rose-700)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reservar
              </Link>
              <Link
                to="/admin/login"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isActive("/admin/login")
                    ? "bg-[var(--rose-100)] text-[var(--rose-600)] font-medium"
                    : "text-[var(--rose-400)] hover:bg-[var(--rose-50)]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className="w-4 h-4" />
                Portal Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}