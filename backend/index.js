const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const shortestRoutes = require('./routes/shortest');
const router=express.Router() // Import the cors package
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/shortest', shortestRoutes);

require('dotenv').config();

const PORT = process.env.PORT ; 



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    


