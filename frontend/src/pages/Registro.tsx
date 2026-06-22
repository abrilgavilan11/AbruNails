import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Shield, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrarse");
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
    <div className="bg-background min-h-[80vh] flex items-center py-12">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--rose-100)] rounded-full mb-4">
            <Shield className="w-8 h-8 text-[var(--rose-600)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--rose-900)] mb-2">Crear Cuenta</h1>
          <p className="text-[var(--rose-700)]">Completá tus datos para registrarte</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[var(--rose-200)] p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--rose-900)] mb-2">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-[var(--rose-500)]" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] bg-white text-[var(--rose-900)] outline-none"
                  placeholder="Abril Gavilan"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--rose-900)] mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[var(--rose-500)]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] bg-white text-[var(--rose-900)] outline-none"
                  placeholder="abril@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--rose-900)] mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[var(--rose-500)]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] bg-white text-[var(--rose-900)] outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--rose-900)] mb-2">Rol (Solo para pruebas)</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] bg-white text-[var(--rose-900)] outline-none"
              >
                <option value="cliente">Cliente normal</option>
                <option value="admin">Administradora</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[var(--rose-600)] text-white rounded-lg hover:bg-[var(--rose-700)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Registrando...</> : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--rose-700)]">
            ¿Ya tenés cuenta?{" "}
            <Link to="/admin/login" className="text-[var(--rose-600)] font-bold hover:underline">
              Iniciá sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}