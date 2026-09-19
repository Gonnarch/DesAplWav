const express = require("express");
const router = express.Router();

const TicketController = require("../controllers/TicketController");
const NotificationController = require("../controllers/NotificationController");

// Crear ticket
router.post("/", TicketController.create);

// Listar tickets
router.get("/", TicketController.list);

// Obtener notificaciones de un ticket
router.get("/:id/notifications", NotificationController.listByTicket);

// Asignar ticket a un usuario
router.put("/:id/assign", TicketController.assign);

// Cambiar estado del ticket
router.put("/:id/status", TicketController.changeStatus);

// Eliminar ticket
router.delete("/:id", TicketController.delete);

module.exports = router;