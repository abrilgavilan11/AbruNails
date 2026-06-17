import { useState } from "react";
import { Calendar, Clock, User, CheckCircle, MessageCircle } from "lucide-react";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";

type BookingStep = 1 | 2 | 3 | 4;

interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Mismos servicios que en el catálogo
  const services: ServiceOption[] = [
    { id: "1", name: "Manicuría Clásica", duration: "45 min", price: "$15.000" },
    { id: "2", name: "Esmaltado Semipermanente", duration: "60 min", price: "$18.000" },
    { id: "3", name: "Esculpidas en Gel / Acrílico", duration: "120 min", price: "$25.000" },
    { id: "4", name: "Service de Esculpidas", duration: "90 min", price: "$20.000" },
    { id: "5", name: "Belleza de Pies Clásica", duration: "60 min", price: "$18.000" },
    { id: "6", name: "Kapping Gel", duration: "45 min", price: "$16.000" },
  ];

  const professionals: Professional[] = [
    { id: "1", name: "Abril", specialty: "Especialista en Esculpidas y Nail Art" },
    { id: "2", name: "Cualquier Profesional", specialty: "Primer turno disponible" },
  ];

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Evitar domingos (0) en la lista si el local está cerrado
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-AR", { weekday: "short", month: "short", day: "numeric" });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as BookingStep);
    }
  };

  const handleWhatsAppBooking = () => {
    // Formatear la fecha para que se lea linda en WhatsApp
    const dateObj = new Date(selectedDate);
    // Solución rápida para el desfasaje de zona horaria al crear new Date(YYYY-MM-DD)
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    const formattedDate = dateObj.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });

    const message = `¡Hola! Quería pedir un turno en Abru Nails 💅:
    
*Servicio:* ${selectedService?.name}
*Fecha:* ${formattedDate}
*Hora:* ${selectedTime} hs
*Profesional:* ${selectedProfessional?.name}

¿Me confirman si sigue disponible? ¡Gracias!`;

    // Reemplaza los 0 por tu número real, manteniendo el 549299
    const whatsappUrl = `https://wa.me/5492995345386?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== "" && selectedTime !== "";
      case 3:
        return selectedProfessional !== null;
      default:
        return false;
    }
  };

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1}>Reserva tu Turno</Title>
          <p className="text-lg text-[var(--rose-700)]">
            Seguí estos simples pasos para agendar tu visita
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step <= currentStep
                        ? "bg-[var(--rose-600)] text-white shadow-md"
                        : "bg-[var(--rose-200)] text-[var(--rose-700)]"
                    }`}
                  >
                    {step}
                  </div>
                  <div
                    className={`text-xs mt-2 text-center font-medium ${
                      step <= currentStep ? "text-[var(--rose-900)]" : "text-[var(--rose-600)]"
                    }`}
                  >
                    {step === 1 && "Servicio"}
                    {step === 2 && "Fecha/Hora"}
                    {step === 3 && "Profesional"}
                    {step === 4 && "Confirmar"}
                  </div>
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full ${
                      step < currentStep ? "bg-[var(--rose-600)]" : "bg-[var(--rose-200)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--rose-200)] p-6 md:p-8 min-h-[500px] flex flex-col">
          
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--rose-100)] rounded-full flex items-center justify-center shadow-inner">
                  <Calendar className="w-6 h-6 text-[var(--rose-600)]" />
                </div>
                <Title level={2} className="!mb-0">Elegí el Servicio</Title>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedService?.id === service.id
                        ? "border-[var(--rose-600)] bg-[var(--rose-50)] shadow-md transform scale-[1.02]"
                        : "border-[var(--rose-200)] hover:border-[var(--rose-400)] hover:shadow-sm"
                    }`}
                  >
                    <h3 className="font-semibold text-[var(--rose-900)] mb-1">{service.name}</h3>
                    <div className="flex items-center justify-between text-sm text-[var(--rose-700)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {service.duration}</span>
                      <span className="font-bold text-[var(--rose-600)]">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--rose-100)] rounded-full flex items-center justify-center shadow-inner">
                  <Clock className="w-6 h-6 text-[var(--rose-600)]" />
                </div>
                <Title level={2} className="!mb-0">Elegí Fecha y Hora</Title>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--rose-900)] mb-3">Días Disponibles</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {generateDates().map((date, index) => {
                      const dateStr = date.toISOString().split("T")[0];
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-lg border-2 text-center transition-all text-sm capitalize cursor-pointer ${
                            selectedDate === dateStr
                              ? "border-[var(--rose-600)] bg-[var(--rose-50)] font-bold shadow-sm"
                              : "border-[var(--rose-200)] hover:border-[var(--rose-400)]"
                          }`}
                        >
                          {formatDate(date)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="font-semibold text-[var(--rose-900)] mb-3">
                      Horarios Disponibles
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-center transition-all text-sm cursor-pointer ${
                            selectedTime === time
                              ? "border-[var(--rose-600)] bg-[var(--rose-50)] font-bold shadow-sm"
                              : "border-[var(--rose-200)] hover:border-[var(--rose-400)]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Select Professional */}
          {currentStep === 3 && (
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--rose-100)] rounded-full flex items-center justify-center shadow-inner">
                  <User className="w-6 h-6 text-[var(--rose-600)]" />
                </div>
                <Title level={2} className="!mb-0">Elegí la Profesional</Title>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionals.map((professional) => (
                  <button
                    key={professional.id}
                    onClick={() => setSelectedProfessional(professional)}
                    className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedProfessional?.id === professional.id
                        ? "border-[var(--rose-600)] bg-[var(--rose-50)] shadow-md transform scale-[1.02]"
                        : "border-[var(--rose-200)] hover:border-[var(--rose-400)] hover:shadow-sm"
                    }`}
                  >
                    <h3 className="font-bold text-[var(--rose-900)] mb-1 text-lg">
                      {professional.name}
                    </h3>
                    <p className="text-sm text-[var(--rose-700)]">{professional.specialty}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--rose-100)] rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle className="w-6 h-6 text-[var(--rose-600)]" />
                </div>
                <Title level={2} className="!mb-0">Revisar y Confirmar</Title>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 border border-[var(--rose-200)] bg-[var(--rose-50)/50] rounded-xl flex justify-between items-center">
                  <div>
                    <div className="text-sm text-[var(--rose-700)] mb-1">Servicio seleccionado</div>
                    <div className="font-semibold text-[var(--rose-900)] text-lg">
                      {selectedService?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--rose-600)] text-xl">{selectedService?.price}</div>
                    <div className="text-xs text-[var(--rose-700)]">{selectedService?.duration}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-[var(--rose-200)] bg-[var(--rose-50)/50] rounded-xl">
                    <div className="text-sm text-[var(--rose-700)] mb-1">Fecha y Hora</div>
                    <div className="font-semibold text-[var(--rose-900)] capitalize">
                      {selectedDate && (() => {
                        const d = new Date(selectedDate);
                        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
                        return d.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });
                      })()}
                    </div>
                    <div className="text-[var(--rose-600)] font-medium mt-1">{selectedTime} hs</div>
                  </div>

                  <div className="p-4 border border-[var(--rose-200)] bg-[var(--rose-50)/50] rounded-xl">
                    <div className="text-sm text-[var(--rose-700)] mb-1">Profesional</div>
                    <div className="font-semibold text-[var(--rose-900)]">
                      {selectedProfessional?.name}
                    </div>
                    <div className="text-xs text-[var(--rose-700)] mt-1 truncate">
                      {selectedProfessional?.specialty}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f5ff] border border-[var(--lavender)] rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-[var(--rose-600)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--rose-900)] mb-1">
                      Completar vía WhatsApp
                    </h3>
                    <p className="text-sm text-[var(--rose-700)] leading-relaxed">
                      Al hacer clic en el botón, se abrirá WhatsApp con un mensaje pre-armado con los datos de tu turno. Te confirmaremos la reserva a la brevedad por ese medio.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppBooking}
                className="w-full py-4 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar por WhatsApp
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--rose-200)]">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400 hover:bg-transparent hover:text-gray-400" : ""}
            >
              Atrás
            </Button>

            {currentStep < 4 && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
              >
                Siguiente
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}