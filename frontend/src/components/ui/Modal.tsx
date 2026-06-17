import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import Title from "./Title";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Evitamos que la página de fondo se mueva cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Fondo oscuro y borroso (Overlay). Si hacés clic acá, se cierra el modal */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Contenedor principal de la ventanita */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Modal con el Título y la X para cerrar */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--rose-200)] bg-[var(--rose-50)/50]">
          <Title level={3} className="!mb-0">{title}</Title>
          <button 
            onClick={onClose}
            className="p-2 text-[var(--rose-500)] hover:text-[var(--rose-700)] hover:bg-[var(--rose-100)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal (Acá adentro va a ir nuestro formulario) */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}