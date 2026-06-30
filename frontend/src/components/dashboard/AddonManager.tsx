import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Search, Clock } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Modal from "../ui/Modal";

interface Addon {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export default function AddonManager() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);

  const fetchAddons = async () => {
    try {
      const response = await fetch("https://abrunails.onrender.com/api/addons");
      const data = await response.json();
      setAddons(data);
    } catch (error) {
      console.error("Error cargando adicionales:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const openCreateModal = () => {
    setEditingAddon(null);
    setIsModalOpen(true);
  };

  const openEditModal = (addon: Addon) => {
    setEditingAddon(addon);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás segura de que querés eliminar este adicional?")) return;
    
    try {
      const response = await fetch(`https://abrunails.onrender.com/api/addons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAddons();
      }
    } catch (error) {
      console.error("Error eliminando el adicional:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const addonData = {
      name: formData.get("name"),
      price: formData.get("price"),
      duration: formData.get("duration")
    };

    const method = editingAddon ? "PUT" : "POST";
    const url = editingAddon 
      ? `https://abrunails.onrender.com/api/addons/${editingAddon.id}`
      : "https://abrunails.onrender.com/api/addons";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addonData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchAddons();
      }
    } catch (error) {
      console.error("Error guardando el adicional:", error);
    }
  };

  const filteredAddons = addons.filter(addon => 
    addon.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Buscar por nombre..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button className="flex items-center gap-2" onClick={openCreateModal}>
          <Plus className="w-5 h-5" />
          Nuevo Adicional
        </Button>
      </div>

      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--rose-50)] text-[var(--rose-900)] text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Adicional</th>
                <th className="p-4 font-semibold">Duración Extra</th>
                <th className="p-4 font-semibold">Precio Extra</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rose-100)]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--rose-500)] animate-pulse">
                    Cargando adicionales...
                  </td>
                </tr>
              ) : filteredAddons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--rose-500)]">
                    No se encontraron adicionales.
                  </td>
                </tr>
              ) : (
                filteredAddons.map((addon) => (
                  <tr key={addon.id} className="hover:bg-[var(--rose-50)/50] transition-colors">
                    <td className="p-4 font-bold text-[var(--rose-900)]">{addon.name}</td>
                    <td className="p-4 text-[var(--rose-700)]">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> +{addon.duration} min</span>
                    </td>
                    <td className="p-4 text-green-600 font-bold">+${addon.price}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(addon)}
                          className="p-2 text-[var(--rose-600)] hover:bg-[var(--rose-50)] rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(addon.id)}
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
        title={editingAddon ? "Editar Adicional" : "Crear Adicional"}
      >
        <form key={editingAddon ? editingAddon.id : 'new'} className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <Label>Nombre del Adicional</Label>
            <Input name="name" type="text" defaultValue={editingAddon?.name} placeholder="Ej: Retiro de Acrílico" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duración Extra (minutos)</Label>
              <Input name="duration" type="number" defaultValue={editingAddon?.duration} placeholder="Ej: 30" required />
            </div>
            <div>
              <Label>Precio Extra ($)</Label>
              <Input name="price" type="number" defaultValue={editingAddon?.price} placeholder="Ej: 3000" required />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-[var(--rose-200)]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingAddon ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
