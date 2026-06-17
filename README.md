# 💅 Abru Nails - Sistema de Gestión de Turnos

> **Aviso:** Este es un proyecto experimental diseñado como demostración técnica y pieza de portafolio. No corresponde a un dominio o negocio real en producción.

## 📝 Descripción

Abru Nails es una aplicación web Full-Stack orientada a la gestión integral de un salón de belleza. Permite a los clientes explorar servicios y solicitar turnos de manera intuitiva, mientras que proporciona a la administración un *Dashboard* completo para gestionar la agenda, el catálogo de servicios y la base de datos de clientas.

## ✨ Características Principales

### 👩‍💻 Interfaz Pública (Clientes)
* **Catálogo Dinámico:** Visualización atractiva de servicios, duraciones y precios actualizados.
* **Reserva de Turnos (Wizard):** Flujo paso a paso validado para seleccionar servicio, profesional, fecha y hora.
* **Integración Inteligente:** Derivación automática a WhatsApp con un mensaje pre-armado resumiendo los datos de la reserva para su confirmación final.

### 🔐 Panel de Administración (Dashboard)
* **Métricas (KPIs):** Resumen visual de turnos del día, solicitudes pendientes e ingresos estimados.
* **Agenda Interactiva:** Calendario dinámico (estilo Google Calendar) con vistas por mes, semana y día.
* **Gestor de Catálogo:** Creación, edición y actualización de servicios sin necesidad de tocar el código.
* **Mini-CRM:** Base de datos de clientas con historial de visitas, cálculo de gastos totales y accesos rápidos de contacto.

## 🛠️ Stack Tecnológico

El proyecto está dividido en una arquitectura Frontend/Backend moderna y tipada:

**Frontend:**
* React + Vite
* TypeScript
* Tailwind CSS (Estilizado UI)
* React Router DOM (Navegación protegida y pública)
* React Big Calendar (Manejo de fechas y agenda)
* Lucide React (Iconografía)

**Backend & Base de Datos:**
* Node.js + Express
* Prisma ORM
* PostgreSQL (Alojado en Supabase)

## 🚀 Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, asegúrate de tener `pnpm` y Node.js instalados.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/abrilgavilan11/AbruNails.git](https://github.com/abrilgavilan11/AbruNails.git)
   cd AbruNails
   ```
2. **Configuración del Backend:**
   ```bash
   cd backend
   pnpm install
   ```
  * Crea un archivo .env en la carpeta backend con tus credenciales de PostgreSQL (DATABASE_URL y DIRECT_URL).
  * Sincroniza la base de datos con Prisma:
    ```bash
    pnpm prisma migrate dev
    ```
3. **Configuración del Frontend:**
   ```bash
   cd ../frontend
   pnpm install
   pnpm dev
   ```
  * La aplicación estará disponible en http://localhost:5173

## 👤 Autor
Desarrollado por Abril Gavilan.
