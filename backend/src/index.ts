import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "¡El servidor de Abru Nails está corriendo perfecto! 💅" });
});

// --- SETTINGS ---
app.get("/api/settings", async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    const config = settings.reduce((acc: any, s) => ({ ...acc, [s.key]: s.value }), {});
    if (!config.bufferTime) config.bufferTime = "15";
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.put("/api/settings", async (req: Request, res: Response) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      });
    }
    res.json({ message: "Guardado" });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

// --- ADDONS ---
app.get("/api/addons", async (_req: Request, res: Response) => {
  try {
    const addons = await prisma.addon.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(addons);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.post("/api/addons", async (req: Request, res: Response) => {
  try {
    const { name, price, duration } = req.body;
    const newAddon = await prisma.addon.create({
      data: { name, price: Number(price), duration: Number(duration) }
    });
    res.status(201).json(newAddon);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.put("/api/addons/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, duration } = req.body;
    const updatedAddon = await prisma.addon.update({
      where: { id: String(id) },
      data: { name, price: Number(price), duration: Number(duration) }
    });
    res.json(updatedAddon);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.delete("/api/addons/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.addon.delete({ where: { id: String(id) } });
    res.json({ message: "Eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

// --- CATEGORIES ---

app.get("/api/categories", async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: "Hubo un problema al cargar las categorías" });
  }
});

app.post("/api/categories", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: { name }
    });
    res.status(201).json({ message: "Categoría creada", data: newCategory });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: "No se pudo crear la categoría" });
  }
});

app.put("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id: String(id) },
      data: { name }
    });
    res.json({ message: "Categoría actualizada", data: updatedCategory });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: "No se pudo actualizar la categoría" });
  }
});

app.delete("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: String(id) }
    });
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ error: "No se pudo eliminar la categoría" });
  }
});

// --- SERVICES ---

app.get("/api/services", async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
      include: { category: true }
    });
    res.json(services);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ error: "Hubo un problema al cargar los servicios" });
  }
});

app.post("/api/services", async (req: Request, res: Response) => {
  try {
    const { name, description, price, duration, categoryId, image } = req.body;

    const newService = await prisma.service.create({
      data: {
        name,
        description: description || "",
        price: Number(price),
        duration: Number(duration),
        categoryId,
        image: image || null
      }
    });

    res.status(201).json({ message: "¡Servicio creado con éxito!", data: newService });
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    res.status(500).json({ error: "No se pudo crear el servicio" });
  }
});

app.put("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, categoryId, image } = req.body;

    const updatedService = await prisma.service.update({
      where: { id: String(id) }, 
      data: {
        name,
        description: description || "",
        price: Number(price),
        duration: Number(duration),
        categoryId,
        image: image || null
      }
    });
    res.json({ message: "Servicio actualizado", data: updatedService });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ error: "No se pudo actualizar el servicio" });
  }
});

app.delete("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.service.delete({
      where: { id: String(id) } 
    });

    res.json({ message: "Servicio eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ error: "No se pudo eliminar el servicio" });
  }
});

app.get("/api/clients", async (_req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        OR: [
          { user: null },
          { user: { role: { not: "admin" } } }
        ]
      },
      orderBy: { name: 'asc' }
    });
    res.json(clients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Hubo un problema al cargar los clientes" });
  }
});

app.post("/api/clients", async (req: Request, res: Response) => {
  try {
    const { name, phone, isVIP } = req.body;
    const newClient = await prisma.client.create({
      data: { 
        name, 
        phone, 
        isVIP: Boolean(isVIP) 
      }
    });
    res.status(201).json({ message: "¡Clienta registrada con éxito!", data: newClient });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "No se pudo registrar a la clienta" });
  }
});

app.put("/api/clients/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, isVIP } = req.body;
    const updatedClient = await prisma.client.update({
      where: { id: String(id) },
      data: { name, phone, isVIP: Boolean(isVIP) }
    });
    res.json({ message: "Datos actualizados", data: updatedClient });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "No se pudo actualizar a la clienta" });
  }
});

app.delete("/api/clients/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.client.delete({
      where: { id: String(id) }
    });
    res.json({ message: "Clienta eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "No se pudo eliminar a la clienta" });
  }
});

app.get("/api/appointments", async (_req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        client: true,
        service: true,
        addons: true
      },
      orderBy: { date: 'asc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    res.status(500).json({ error: "Hubo un problema al cargar la agenda" });
  }
});

app.post("/api/appointments", async (req: Request, res: Response) => {
  try {
    const { clientId, serviceId, date, status, addonIds } = req.body;
    
    const service = await prisma.service.findUnique({ where: { id: String(serviceId) } });
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" });

    let totalDuration = service.duration;
    let totalPrice = service.price;

    const addonsToConnect: { id: string }[] = [];
    if (addonIds && Array.isArray(addonIds) && addonIds.length > 0) {
      const addons = await prisma.addon.findMany({ where: { id: { in: addonIds } } });
      addons.forEach(a => {
        totalDuration += a.duration;
        totalPrice += a.price;
        addonsToConnect.push({ id: a.id });
      });
    }

    const newAppointment = await prisma.appointment.create({
      data: { 
        date: new Date(date),
        status: status || "pendiente",
        client: { connect: { id: String(clientId) } },
        service: { connect: { id: String(serviceId) } },
        addons: { connect: addonsToConnect },
        totalDuration,
        totalPrice
      },
      include: {
        client: true,
        service: true,
        addons: true
      }
    });
    
    res.status(201).json({ message: "¡Turno agendado con éxito!", data: newAppointment });
  } catch (error) {
    console.error("Error al crear turno:", error);
    res.status(500).json({ error: "No se pudo registrar el turno" });
  }
});

app.put("/api/appointments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAppointment = await prisma.appointment.update({
      where: { id: String(id) },
      data: { status },
      include: { client: true, service: true, addons: true }
    });
    res.json({ message: "Estado actualizado", data: updatedAppointment });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "No se pudo actualizar el turno" });
  }
});

// --- AVAILABILITY ENGINE ---
app.get("/api/availability", async (req: Request, res: Response) => {
  try {
    const { date, duration } = req.query;
    if (!date || !duration) return res.status(400).json({ error: "Faltan datos" });

    const reqDuration = Number(duration);
    
    const bufferSetting = await prisma.setting.findUnique({ where: { key: "bufferTime" } });
    const bufferTime = bufferSetting ? Number(bufferSetting.value) : 15;
    
    const totalReqTime = reqDuration + bufferTime;

    const queryDate = new Date(`${date}T00:00:00-03:00`); 
    if (isNaN(queryDate.getTime())) return res.status(400).json({ error: "Fecha inválida" });

    const nextDate = new Date(queryDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: queryDate,
          lt: nextDate
        },
        status: { not: "cancelado" }
      },
      orderBy: { date: 'asc' }
    });

    const slots = [];
    let current = new Date(queryDate);
    current.setHours(9, 0, 0, 0); 
    
    const endOfDay = new Date(queryDate);
    endOfDay.setHours(19, 0, 0, 0); 

    while (current < endOfDay) {
      const slotEnd = new Date(current.getTime() + totalReqTime * 60000);
      
      if (slotEnd > endOfDay) {
        break; 
      }

      let overlap = false;
      for (const app of appointments) {
        const appStart = app.date;
        const appEnd = new Date(appStart.getTime() + (app.totalDuration + bufferTime) * 60000);
        
        if (current < appEnd && slotEnd > appStart) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        slots.push(current.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }));
      }

      current = new Date(current.getTime() + 30 * 60000);
    }

    res.json({ slots });
  } catch (error) {
    console.error("Error en availability:", error);
    res.status(500).json({ error: "Error interno" });
  }
});


app.delete("/api/appointments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({
      where: { id: String(id) }
    });
    res.json({ message: "Turno eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar turno:", error);
    res.status(500).json({ error: "No se pudo eliminar el turno" });
  }
});

app.post("/api/auth/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role, phone } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userCount = await prisma.user.count();
    
    const finalRole = userCount === 0 ? (role || "admin") : "cliente";

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: finalRole,
        ...(finalRole === "cliente" && {
          client: {
            create: {
              name: name,
              phone: phone || "Sin especificar",
            }
          }
        })
      },
      include: {
        client: true 
      }
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      clientId: newUser.client?.id
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al cargar los usuarios" });
  }
});

app.put("/api/users/:id/role", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (role !== "admin" && role !== "cliente") {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: { role },
      select: { id: true, name: true, email: true, role: true }
    });
    
    res.json({ message: "Rol actualizado", data: updatedUser });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ error: "No se pudo actualizar el rol" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});