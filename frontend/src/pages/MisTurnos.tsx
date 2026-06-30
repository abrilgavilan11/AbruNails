import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Loader2, History, CalendarCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MisTurnos() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/appointments");
        if (!response.ok) throw new Error("Error al cargar los turnos");
        
        const data = await response.json();

        const misTurnos = data.filter(
          (apt: any) => apt.client?.userId === user?.id
        );

        misTurnos.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setAppointments(misTurnos);
      } catch (error) {
        console.error("Error trayendo los turnos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--cream)] px-4">
        <h2 className="text-2xl font-bold text-[var(--rose-900)] mb-4">Acceso Denegado</h2>
        <p className="text-[var(--rose-700)] mb-6 text-center">Tenés que iniciar sesión para ver tus turnos.</p>
        <Link to="/admin/login" className="px-6 py-3 bg-[var(--rose-600)] text-white rounded-lg font-medium hover:bg-[var(--rose-700)] transition-colors">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const ahora = new Date();
  const proximos = appointments.filter((apt) => new Date(apt.date) >= ahora);
  const historial = appointments.filter((apt) => new Date(apt.date) < ahora && apt.status !== "cancelado");

  const formatearFecha = (fechaStr: string) => {
    const d = new Date(fechaStr);
    return {
      dia: d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }),
      hora: d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    };
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-10 border-b border-[var(--rose-200)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--rose-900)] mb-2">¡Hola, {user.name}!</h1>
          <p className="text-[var(--rose-700)]">Acá podés gestionar todas tus reservas en Abru Nails.</p>
        </header>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-[var(--rose-500)]">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium">Buscando tus turnos...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--rose-100)] p-12 text-center">
            <Calendar className="w-16 h-16 text-[var(--rose-300)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--rose-900)] mb-2">Aún no tenés turnos</h3>
            <p className="text-[var(--rose-700)] mb-6">Parece que todavía no te hiciste ningún mimo con nosotras.</p>
            <Link to="/reservar" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--rose-600)] text-white rounded-xl font-medium hover:bg-[var(--rose-700)] transition-colors">
              <CalendarCheck className="w-5 h-5" />
              Reservar mi primer turno
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* SECCIÓN: Próximos Turnos */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--rose-800)] mb-6 flex items-center gap-2">
                <CalendarCheck className="w-6 h-6" /> Próximos Turnos
              </h2>
              {proximos.length === 0 ? (
                <p className="text-[var(--rose-600)] italic bg-white p-4 rounded-xl border border-[var(--rose-100)]">No tenés turnos agendados próximamente.</p>
              ) : (
                <div className="grid gap-4">
                  {proximos.map((apt) => {
                    const { dia, hora } = formatearFecha(apt.date);
                    return (
                      <div key={apt.id} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-[var(--rose-200)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[var(--rose-400)]">
                        <div>
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase rounded-full mb-2">
                            {apt.status}
                          </span>
                          <h3 className="text-lg font-bold text-[var(--rose-900)]">{apt.service?.name || "Servicio"}</h3>
                          <div className="flex items-center gap-4 mt-2 text-[var(--rose-700)] text-sm">
                            <span className="flex items-center gap-1 capitalize"><Calendar className="w-4 h-4" /> {dia}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {hora} hs</span>
                          </div>
                        </div>
                        <div className="text-right w-full sm:w-auto">
                          <p className="text-xl font-black text-[var(--rose-600)]">${apt.service?.price.toLocaleString('es-AR')}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* SECCIÓN: Historial */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--rose-800)] mb-6 flex items-center gap-2">
                <History className="w-6 h-6" /> Historial de Servicios
              </h2>
              {historial.length === 0 ? (
                <p className="text-[var(--rose-600)] italic bg-white p-4 rounded-xl border border-[var(--rose-100)]">Todavía no tenés servicios finalizados.</p>
              ) : (
                <div className="grid gap-4 opacity-75">
                  {historial.map((apt) => {
                    const { dia } = formatearFecha(apt.date);
                    return (
                      <div key={apt.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center gap-4">
                        <div>
                          <h3 className="font-bold text-gray-700">{apt.service?.name || "Servicio"}</h3>
                          <p className="text-sm text-gray-500 capitalize">{dia}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                          Completado
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </div>
        )}
      </div>
    </div>
  );
}