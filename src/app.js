const express = require('express');
const comidasRoutes = require('./routes/comidasRoutes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/comidas', comidasRoutes);
app.use('/api/auth', authRoutes);



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});