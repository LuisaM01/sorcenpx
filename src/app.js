// imports
import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json())

// Endpoints
app.use(indexRoutes);
app.use('/api',usuariosRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'ENDPOINT NO ENCONTRADA'
    })
})

export default app;