const TicketService = require("../services/TicketService");
const service = new TicketService();

exports.create = (req, res, next) => {
    try {
        const ticket = service.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
};

exports.list = (req, res, next) => {
    try {
        const tickets = service.list();

        // Obtener page y limit desde la URL
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        // Calcular desde dónde hasta dónde mostrar
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Obtener solo los tickets de esa página
        const paginatedTickets = tickets.slice(startIndex, endIndex);

        res.status(200).json({
            page: page,
            limit: limit,
            total: tickets.length,
            totalPages: Math.ceil(tickets.length / limit),
            tickets: paginatedTickets
        });

    } catch (err) {
        next(err);
    }
};

exports.assign = (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req.body;

        const ticket = service.assignTicket(id, user);

        if (!ticket) {
            return res.status(404).json({
                error: "Ticket no encontrado"
            });
        }

        res.status(200).json(ticket);

    } catch (err) {
        next(err);
    }
};

exports.changeStatus = (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ticket = service.changeStatus(id, status);

        if (!ticket) {
            return res.status(404).json({
                error: "Ticket no encontrado"
            });
        }

        res.status(200).json(ticket);

    } catch (err) {
        next(err);
    }
};

exports.delete = (req, res, next) => {
    try {
        service.deleteTicket(req.params.id);

        res.json({
            message: "Ticket eliminado correctamente"
        });

    } catch (err) {
        next(err);
    }
};