const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API de Usuarios Funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});