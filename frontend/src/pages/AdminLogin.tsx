import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://abrunails.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      login(data);

      if (data.role === "admin" || data.role === "superusuario") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12 md:py-20 flex items-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--rose-100)] rounded-full mb-4">
            <Shield className="w-8 h-8 text-[var(--rose-600)]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--rose-900)] mb-2">
            Portal de Administración
          </h1>
          <p className="text-[var(--rose-700)]">
            Acceso seguro solo para personal autorizado
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[var(--rose-200)] p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--rose-900)] mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[var(--rose-500)]" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] focus:border-[var(--rose-600)] transition-all bg-white text-[var(--rose-900)] outline-none"
                  placeholder="admin@abrunails.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--rose-900)] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[var(--rose-500)]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] focus:border-[var(--rose-600)] transition-all bg-white text-[var(--rose-900)] outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--rose-500)] hover:text-[var(--rose-600)] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/registro"
                className="text-sm font-medium text-[var(--rose-600)] hover:text-[var(--rose-700)] transition-colors"
              >
                Crear cuenta
              </Link>
              <a
                href="#"
                className="text-sm text-[var(--rose-600)] hover:text-[var(--rose-700)] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[var(--rose-600)] text-white rounded-lg hover:bg-[var(--rose-700)] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Ingreso Seguro
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#f8f5ff] rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[var(--rose-600)] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-[var(--rose-900)] mb-1">
                  Acceso Seguro
                </h3>
                <p className="text-xs text-[var(--rose-700)]">
                  Este portal está protegido. Todos los intentos de inicio de sesión son monitoreados y registrados.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--rose-600)] mt-2">
            Soporte: admin@abrunails.com
          </p>
        </div>
      </div>
    </div>
  );
}