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
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "¡El servidor de Abru Nails está corriendo perfecto! 💅" });
});

app.get("/api/services", async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(services);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ error: "Hubo un problema al cargar los servicios" });
  }
});

app.post("/api/services", async (req: Request, res: Response) => {
  try {
    const { name, description, price, duration, category } = req.body;

    const newService = await prisma.service.create({
      data: {
        name,
        description: description || "",
        price: Number(price),
        duration: Number(duration),
        category,
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
    const { name, description, price, duration, category } = req.body;

    const updatedService = await prisma.service.update({
      where: { id: String(id) }, 
      data: {
        name,
        description: description || "",
        price: Number(price),
        duration: Number(duration),
        category,
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
        service: true
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
    const { clientId, serviceId, date, status } = req.body;
    
    const newAppointment = await prisma.appointment.create({
      data: { 
        date: new Date(date),
        status: status || "pendiente",
        client: { connect: { id: String(clientId) } },
        service: { connect: { id: String(serviceId) } }
      },
      include: {
        client: true,
        service: true
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
    const { date, status } = req.body;
    
    const updatedAppointment = await prisma.appointment.update({
      where: { id: String(id) },
      data: { 
        ...(date && { date: new Date(date) }), 
        ...(status && { status })              
      }
    });
    
    res.json({ message: "Turno actualizado", data: updatedAppointment });
  } catch (error) {
    console.error("Error al actualizar turno:", error);
    res.status(500).json({ error: "No se pudo actualizar el turno" });
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
    const { name, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "cliente"
      }
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});