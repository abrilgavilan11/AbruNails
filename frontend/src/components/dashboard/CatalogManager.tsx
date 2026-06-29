import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Modal from "../ui/Modal";

interface Service {
  id: string | number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category?: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function CatalogManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás segura de que querés eliminar este servicio de forma permanente?")) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error eliminando el servicio:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const serviceData = {
      name: formData.get("name"),
      categoryId: formData.get("categoryId"),
      duration: formData.get("duration"),
      price: formData.get("price"),
      description: formData.get("description"),
    };

    const method = editingService ? "PUT" : "POST";
    const url = editingService 
      ? `http://localhost:3000/api/services/${editingService.id}`
      : "http://localhost:3000/api/services";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchServices();
      }
    } catch (error) {
      console.error("Error guardando el servicio:", error);
    }
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
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
        
        <Button className="flex items-center gap-2" onClick={openCreateModal}>
          <Plus className="w-5 h-5" />
          Nuevo Servicio
        </Button>
      </div>

      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--rose-50)] text-[var(--rose-900)] text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Servicio</th>
                <th className="p-4 font-semibold">Categoría</th>
                <th className="p-4 font-semibold">Duración</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rose-100)]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--rose-500)] animate-pulse">
                    Cargando servicios...
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--rose-500)]">
                    No se encontraron servicios.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-[var(--rose-50)/50] transition-colors">
                    <td className="p-4 font-medium text-[var(--rose-900)]">{service.name}</td>
                    <td className="p-4 text-[var(--rose-700)]">
                      <span className="bg-[var(--rose-100)] text-[var(--rose-800)] px-2 py-1 rounded text-xs font-semibold uppercase">
                        {service.category?.name || 'Sin Categoría'}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--rose-700)]">{service.duration} min</td>
                    <td className="p-4 font-bold text-[var(--rose-600)]">${service.price.toLocaleString('es-AR')}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(service)}
                          className="p-2 text-[var(--rose-600)] hover:bg-[var(--rose-50)] rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingService ? "Editar Servicio" : "Agregar Nuevo Servicio"}
      >
        <form key={editingService ? editingService.id : 'new'} className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <Label>Nombre del Servicio</Label>
            <Input name="name" type="text" defaultValue={editingService?.name} placeholder="Ej: Uñas Esculpidas XL" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoría</Label>
              <select name="categoryId" defaultValue={editingService?.category?.id || ""} className="block w-full px-4 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] focus:border-[var(--rose-600)] bg-white outline-none" required>
                <option value="" disabled>Seleccionar Categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Duración (minutos)</Label>
              <Input name="duration" type="number" defaultValue={editingService?.duration} placeholder="Ej: 90" required />
            </div>
          </div>

          <div>
            <Label>Precio ($)</Label>
            <Input name="price" type="number" defaultValue={editingService?.price} placeholder="Ej: 20000" required />
          </div>

          <div>
            <Label>Descripción Corta</Label>
            <textarea 
              name="description"
              defaultValue={editingService?.description}
              className="block w-full px-4 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] outline-none resize-none"
              rows={3}
              placeholder="Detalles del servicio..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-[var(--rose-200)]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingService ? "Actualizar Cambios" : "Guardar Servicio"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}