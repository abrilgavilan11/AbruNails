import { useState } from "react";
import { Search, MessageCircle, FileText, Star } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";

// Datos de prueba simulando tu base de clientes fieles
const initialClients = [
  { id: "1", name: "Sofía Martínez", phone: "5492991112222", displayPhone: "+54 9 299 111-2222", visits: 8, lastVisit: "15 Jun 2026", totalSpent: "$145.000", isVIP: true },
  { id: "2", name: "Valentina Gómez", phone: "5492993334444", displayPhone: "+54 9 299 333-4444", visits: 2, lastVisit: "10 Jun 2026", totalSpent: "$32.000", isVIP: false },
  { id: "3", name: "Camila Silva", phone: "5492995556666", displayPhone: "+54 9 299 555-6666", visits: 1, lastVisit: "01 Jun 2026", totalSpent: "$18.000", isVIP: false },
  { id: "4", name: "Lucía Pérez", phone: "5492997778888", displayPhone: "+54 9 299 777-8888", visits: 12, lastVisit: "Hoy", totalSpent: "$210.000", isVIP: true },
];

export default function ClientManager() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = initialClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.displayPhone.includes(searchTerm)
  );

  const handleWhatsApp = (phone: string, name: string) => {
    const message = `¡Hola ${name}! Te escribo de Abru Nails 💅. `;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Buscador */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--rose-400)]" />
          </div>
          <Input 
            type="text" 
            placeholder="Buscar clienta por nombre o teléfono..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de Clientes */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--rose-50)] text-[var(--rose-900)] text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Clienta</th>
                <th className="p-4 font-semibold">Contacto</th>
                <th className="p-4 font-semibold text-center">Visitas</th>
                <th className="p-4 font-semibold">Última Visita</th>
                <th className="p-4 font-semibold">Total Gastado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rose-100)]">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-[var(--rose-50)/50] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--rose-100)] flex items-center justify-center text-[var(--rose-800)] font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--rose-900)] flex items-center gap-1">
                          {client.name}
                          {client.isVIP && (
                            <span title="Clienta VIP" className="flex items-center">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--rose-700)]">{client.displayPhone}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-[var(--rose-100)] text-[var(--rose-700)] font-bold rounded-full w-8 h-8">
                      {client.visits}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--rose-700)]">{client.lastVisit}</td>
                  <td className="p-4 font-bold text-[var(--rose-600)]">{client.totalSpent}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleWhatsApp(client.phone, client.name)}
                        title="Enviar WhatsApp"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button 
                        title="Ver ficha o agregar nota (Próximamente)"
                        className="p-2 text-[var(--rose-600)] hover:bg-[var(--rose-50)] rounded-lg transition-colors cursor-pointer"
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredClients.length === 0 && (
            <div className="p-8 text-center text-[var(--rose-500)]">
              No se encontraron clientas en la base de datos.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}