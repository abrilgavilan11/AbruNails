import { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Modal from "../ui/Modal"; // <-- Importamos nuestro nuevo Modal

const initialServices = [
  { id: "1", category: "Manos", name: "Manicuría Clásica", duration: "45 min", price: "$15.000", status: "activo" },
  { id: "2", category: "Manos", name: "Esmaltado Semipermanente", duration: "60 min", price: "$18.000", status: "activo" },
  { id: "3", category: "Manos", name: "Esculpidas en Gel", duration: "120 min", price: "$25.000", status: "activo" },
  { id: "4", category: "Pies", name: "Belleza de Pies", duration: "60 min", price: "$18.000", status: "activo" },
  { id: "5", category: "Tratamientos", name: "Kapping Gel", duration: "45 min", price: "$16.000", status: "pausado" },
];

export default function CatalogManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si la ventanita está abierta

  const filteredServices = initialServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Barra de Herramientas */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--rose-400)]" />
          </div>
          <Input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Al hacer clic, abrimos el modal */}
        <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Nuevo Servicio
        </Button>
      </div>

      {/* Tabla de Servicios */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--rose-50)] text-[var(--rose-900)] text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Servicio</th>
                <th className="p-4 font-semibold">Categoría</th>
                <th className="p-4 font-semibold">Duración</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rose-100)]">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-[var(--rose-50)/50] transition-colors">
                  <td className="p-4 font-medium text-[var(--rose-900)]">{service.name}</td>
                  <td className="p-4 text-[var(--rose-700)]">{service.category}</td>
                  <td className="p-4 text-[var(--rose-700)]">{service.duration}</td>
                  <td className="p-4 font-bold text-[var(--rose-600)]">{service.price}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-[var(--rose-600)] hover:bg-[var(--rose-50)] rounded-lg transition-colors cursor-pointer">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredServices.length === 0 && (
            <div className="p-8 text-center text-[var(--rose-500)]">
              No se encontraron servicios.
            </div>
          )}
        </div>
      </Card>

      {/* ========================================= */}
      {/* VENTANITA (MODAL) PARA CREAR SERVICIO     */}
      {/* ========================================= */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Agregar Nuevo Servicio"
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* Más adelante conectaremos esto a la BD */ setIsModalOpen(false); }}>
          
          <div>
            <Label>Nombre del Servicio</Label>
            <Input type="text" placeholder="Ej: Uñas Esculpidas XL" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoría</Label>
              <select className="block w-full px-4 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] focus:border-[var(--rose-600)] bg-white outline-none">
                <option>Manos</option>
                <option>Pies</option>
                <option>Tratamientos</option>
              </select>
            </div>
            <div>
              <Label>Duración (minutos)</Label>
              <Input type="number" placeholder="Ej: 90" required />
            </div>
          </div>

          <div>
            <Label>Precio ($)</Label>
            <Input type="number" placeholder="Ej: 20000" required />
          </div>

          <div>
            <Label>Descripción Corta (Opcional)</Label>
            <textarea 
              className="block w-full px-4 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] outline-none resize-none"
              rows={3}
              placeholder="Detalles del servicio..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-[var(--rose-200)]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Servicio
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}