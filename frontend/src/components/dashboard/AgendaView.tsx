import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Card from '../ui/Card';

// Configuramos el calendario para que use el formato y el idioma español
const locales = {
  'es': es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // La semana arranca el lunes
  getDay,
  locales,
});

// Turnos de prueba para visualizar en el calendario
const mockEvents = [
  {
    title: 'Esculpidas en Gel - Sofía M.',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0, 0)),
    resource: 'confirmado',
  },
  {
    title: 'Kapping Gel - Valentina G.',
    start: new Date(new Date().setHours(16, 0, 0, 0)),
    end: new Date(new Date().setHours(17, 30, 0, 0)),
    resource: 'pendiente',
  },
];

export default function AgendaView() {
  // Función para darle color a los turnos según su estado
  const eventStyleGetter = (event: any) => {
    let backgroundColor = 'var(--rose-600)';
    
    if (event.resource === 'pendiente') {
      backgroundColor = '#eab308'; // yellow-500
    } else if (event.resource === 'confirmado') {
      backgroundColor = '#22c55e'; // green-500
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '2px 8px',
      }
    };
  };

  return (
    <Card className="bg-white p-4 sm:p-6 shadow-sm border border-[var(--rose-200)]">
      <div className="h-[600px] font-['Merriweather_Sans']">
        <Calendar
          localizer={localizer}
          events={mockEvents}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          messages={{
            next: "Sig",
            previous: "Ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Turno",
            noEventsInRange: "No hay turnos en este rango de fechas.",
          }}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="week"
          min={new Date(0, 0, 0, 8, 0, 0)} // Empieza a las 8 AM
          max={new Date(0, 0, 0, 21, 0, 0)} // Termina a las 9 PM
        />
      </div>
    </Card>
  );
}