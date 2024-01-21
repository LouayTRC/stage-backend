const mongoose = require('mongoose');
const express = require('express');
const app = express();
const ProductRouter=require('./routes/Product')
const clientRouter=require('./routes/Client');
const adminRouter=require('./routes/Admin');
const userRouter=require('./routes/User');
const cmmdRouter=require('./routes/Command');
const favRouter=require('./routes/favorites')
const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authorize');
const onlyAdmin = require('./middleware/onlyAdmin');


mongoose.connect('mongodb+srv://louaytrc:a1z2e3r4@cluster0.t100rzs.mongodb.net/')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/api/auth',userRouter);
app.use('/api/product',ProductRouter);
app.use('/api/client',clientRouter);
app.use('/api/admin',authenticate,onlyAdmin,adminRouter);
app.use('/api/favorites',authenticate,authorize(['CLIENT'],['ADMIN']),favRouter);
app.use('/api/cmmd',authenticate,authorize(['CLIENT'],['ADMIN']),cmmdRouter);

app.use((req, res) => {
    res.json({ message: "serveur works" });
});



module.exports = app;