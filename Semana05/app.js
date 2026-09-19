const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        message: "API RESTful funcionando correctamente"
    });
});

// Rutas
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

// Middleware global de errores
// Debe ir después de las rutas
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});