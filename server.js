import express from 'express';
const app = express();
import dotenv from 'dotenv'
import Color from 'colors';
import cors from 'cors'
//import initialize from './config/db.js'
import noteRoutes from './routes/note.js' 
import logger from 'logger';
import morgan from 'morgan';
import bodyParser from 'body-parser';


dotenv.config();


const port = process.env.PORT || 5000


// db connection
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
 //initialize;
//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1', noteRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});




app.listen(4500, () => {
    console.log(`Server running at http://localhost:${port}`.bgCyan);
});