import { useState } from "react";
import { Link } from "react-router-dom";
import AgendaView from "../components/dashboard/AgendaView";
import CatalogManager from "../components/dashboard/CatalogManager";
import ClientManager from "../components/dashboard/ClientManager";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Scissors, 
  LogOut, 
  Check, 
  X, 
  Clock, 
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const mockAppointments = [
  { id: 1, client: "Sofía Martínez", service: "Esculpidas en Gel", date: "Hoy", time: "14:00", status: "confirmado", price: "$25.000" },
  { id: 2, client: "Valentina Gómez", service: "Kapping Gel", date: "Hoy", time: "16:00", status: "pendiente", price: "$16.000" },
  { id: 3, client: "Camila Silva", service: "Esmaltado Semipermanente", date: "Mañana", time: "10:00", status: "pendiente", price: "$18.000" },
  { id: 4, client: "Lucía Pérez", service: "Belleza de Pies", date: "Mañana", time: "11:30", status: "confirmado", price: "$18.000" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <div className="min-h-screen bg-[var(--cream)] flex flex-col md:flex-row font-['Merriweather_Sans']">
      
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-full md:w-64 bg-white border-r border-[var(--rose-200)] flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-[var(--rose-200)] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[var(--rose-600)]" />
          <span className="font-bold text-xl text-[var(--rose-900)]">Abru Nails Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("inicio")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === "inicio" 
                ? "bg-[var(--rose-600)] text-white shadow-md" 
                : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Inicio</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("agenda")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === "agenda" 
                ? "bg-[var(--rose-600)] text-white shadow-md" 
                : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">Agenda</span>
          </button>

          <button 
            onClick={() => setActiveTab("catalogo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === "catalogo" 
                ? "bg-[var(--rose-600)] text-white shadow-md" 
                : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
            }`}
          >
            <Scissors className="w-5 h-5" />
            <span className="font-medium">Catálogo</span>
          </button>

          <button 
            onClick={() => setActiveTab("clientes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === "clientes" 
                ? "bg-[var(--rose-600)] text-white shadow-md" 
                : "text-[var(--rose-700)] hover:bg-[var(--rose-50)]"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Clientes</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[var(--rose-200)]">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* ======================= */}
          {/* VISTA: INICIO (RESUMEN) */}
          {/* ======================= */}
          {activeTab === "inicio" && (
            <div className="animate-in fade-in duration-300">
              <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Title level={1} className="!mb-1">Panel de Control</Title>
                  <p className="text-[var(--rose-700)]">Bienvenida de nuevo. Aquí está el resumen de tu negocio.</p>
                </div>
                <Button className="md:w-auto">
                  + Nuevo Turno Manual
                </Button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-white border-l-4 border-l-[var(--rose-600)]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-[var(--rose-700)] mb-1">Turnos para Hoy</p>
                      <h3 className="text-3xl font-bold text-[var(--rose-900)]">4</h3>
                    </div>
                    <div className="p-3 bg-[var(--rose-100)] rounded-lg">
                      <CalendarDays className="w-6 h-6 text-[var(--rose-600)]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-l-4 border-l-yellow-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-[var(--rose-700)] mb-1">Solicitudes Pendientes</p>
                      <h3 className="text-3xl font-bold text-[var(--rose-900)]">2</h3>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-l-4 border-l-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-[var(--rose-700)] mb-1">Ingresos Estimados</p>
                      <h3 className="text-3xl font-bold text-[var(--rose-900)]">$77.000</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-white">
                <div className="p-6 border-b border-[var(--rose-200)] flex justify-between items-center">
                  <Title level={3} className="!mb-0">Turnos Recientes</Title>
                  <button 
                    onClick={() => setActiveTab("agenda")}
                    className="text-[var(--rose-600)] text-sm font-medium hover:underline cursor-pointer"
                  >
                    Ver agenda completa
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--rose-50)] text-[var(--rose-900)] text-sm uppercase tracking-wider">
                        <th className="p-4 font-semibold">Cliente</th>
                        <th className="p-4 font-semibold">Servicio</th>
                        <th className="p-4 font-semibold">Fecha y Hora</th>
                        <th className="p-4 font-semibold">Estado</th>
                        <th className="p-4 font-semibold text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--rose-100)]">
                      {mockAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-[var(--rose-50)/50] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[var(--rose-200)] flex items-center justify-center text-[var(--rose-800)] font-bold text-xs">
                                {apt.client.charAt(0)}
                              </div>
                              <span className="font-medium text-[var(--rose-900)]">{apt.client}</span>
                            </div>
                          </td>
                          <td className="p-4 text-[var(--rose-700)]">{apt.service}</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-[var(--rose-900)]">{apt.date}</span>
                              <span className="text-sm text-[var(--rose-600)]">{apt.time} hs</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              apt.status === "confirmado" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {apt.status === "confirmado" ? <Check className="w-3 h-3"/> : <Clock className="w-3 h-3"/>}
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                title="Confirmar turno"
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                disabled={apt.status === "confirmado"}
                              >
                                <Check className="w-5 h-5" />
                              </button>
                              <button 
                                title="Cancelar turno"
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ======================= */}
          {/* VISTA: AGENDA             */}
          {/* ======================= */}
          {activeTab === "agenda" && (
            <div className="animate-in fade-in duration-300">
              <header className="mb-8">
                <Title level={1}>Agenda de Turnos</Title>
                <p className="text-[var(--rose-700)]">Gestioná tus horarios y disponibilidad.</p>
              </header>
              
              <AgendaView />
              
            </div>
          )}

          {/* ======================= */}
          {/* VISTA: CATÁLOGO           */}
          {/* ======================= */}
          {activeTab === "catalogo" && (
            <div className="animate-in fade-in duration-300">
              <header className="mb-8">
                <Title level={1}>Gestión de Catálogo</Title>
                <p className="text-[var(--rose-700)]">Administrá tus servicios, precios y duraciones.</p>
              </header>
              
              <CatalogManager />
              
            </div>
          )}

          {/* ======================= */}
          {/* VISTA: CLIENTES           */}
          {/* ======================= */}
          {activeTab === "clientes" && (
            <div className="animate-in fade-in duration-300">
              <header className="mb-8">
                <Title level={1}>Base de Clientes</Title>
                <p className="text-[var(--rose-700)]">Historial y contacto de las personas que te eligen.</p>
              </header>
              
              <ClientManager />
              
            </div>
          )}

        </div>
      </main>
    </div>
  );
}