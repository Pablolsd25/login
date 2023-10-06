const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importa el paquete cors
const userRoutes = require('./routes/login.routes');

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Configura CORS para permitir solicitudes desde localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(userRoutes);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message
  });
});

app.listen(4000);
console.log('Server on port 4000');
