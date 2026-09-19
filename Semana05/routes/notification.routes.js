const express = require("express");
const router = express.Router();

const NotificationController = require("../controllers/NotificationController");

// Listar todas las notificaciones
router.get("/", NotificationController.list);

module.exports = router;