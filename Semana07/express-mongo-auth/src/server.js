import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.set(
    'views',
    './src/views'
);

app.use(
    express.static('./src/public')
);

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


/* ======================
   API
====================== */

app.use(
    '/api/auth',
    authRoutes
);

app.use(
    '/api/users',
    userRoutes
);


/* ======================
   FRONTEND
====================== */

app.get('/', (req, res) => {

    res.redirect('/signIn');
});


app.get('/signIn', (req, res) => {

    res.render('signin');
});


app.get('/signUp', (req, res) => {

    res.render('signup');
});


app.get('/profile', (req, res) => {

    res.render('profile');
});


app.get('/dashboard-user', (req, res) => {

    res.render('dashboard-user');
});


app.get('/dashboard-admin', (req, res) => {

    res.render('dashboard-admin');
});


app.get('/403', (req, res) => {

    res.status(403).render('403');
});


app.get('/health', (req, res) => {

    res.status(200).json({
        ok: true
    });
});


/* ======================
   404
====================== */

app.use((req, res) => {

    res.status(404).render('404');
});


/* ======================
   ERRORES
====================== */

app.use((err, req, res, next) => {

    console.error(err);

    res
        .status(err.status || 500)
        .json({

            message:
                err.message ||
                'Error interno del servidor'
        });
});


const PORT =
    process.env.PORT || 3000;


mongoose
    .connect(
        process.env.MONGODB_URI,
        {
            autoIndex: true
        }
    )

    .then(async () => {

        console.log(
            'MongoDB conectado'
        );

        await seedRoles();

        await seedUsers();

        app.listen(PORT, () => {

            console.log(
                `Servidor corriendo en http://localhost:${PORT}`
            );
        });
    })

    .catch(err => {

        console.error(
            'Error al conectar MongoDB:',
            err
        );

        process.exit(1);
    });