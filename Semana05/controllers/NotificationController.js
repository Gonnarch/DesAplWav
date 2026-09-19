const NotificationService = require("../services/NotificationService");

const service = new NotificationService();

exports.list = (req, res, next) => {
    try {
        const notifications = service.list();

        res.status(200).json(notifications);

    } catch (err) {
        next(err);
    }
};

exports.listByTicket = (req, res, next) => {
    try {
        const { id } = req.params;

        const notifications = service.listByTicket(id);

        res.status(200).json(notifications);

    } catch (err) {
        next(err);
    }
};