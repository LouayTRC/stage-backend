
const express = require('express');
const cors = require('cors')
const app = express();
const ProductRouter = require('./routes/Product')
const clientRouter = require('./routes/Client');
const adminRouter = require('./routes/Admin');
const authRouter = require('./routes/auth');
const cmmdRouter = require('./routes/Command');
const favRouter = require('./routes/favorites');
const categoryRouter = require('./routes/Category');
const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authorize');
const onlyAdmin = require('./middleware/onlyAdmin');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://louaytrc:a1z2e3r4@cluster0.t100rzs.mongodb.net/')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    ['Content-Type', 'Authorization']
  ],
};
app.use(cors(corsOpts));

app.use('/api/auth', authRouter);
app.use('/api/product', ProductRouter);
app.use('/api/client', authenticate, clientRouter);
app.use('/api/admin', authenticate, onlyAdmin, adminRouter);
app.use('/api/favorites', authenticate, authorize(['CLIENT']), favRouter);
app.use('/api/cmmd', cmmdRouter);
app.use('/api/category', categoryRouter);

app.use((req, res) => {
  res.json({ message: "serveur works" });
});


module.exports = app;