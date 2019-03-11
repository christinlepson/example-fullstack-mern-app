import * as path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const router = express.Router();
const reactFolder = path.resolve('./client/build');

app.use(cors());
app.use(express.static( reactFolder ));

mongoose.connect(
    process.env.DB_ROUTE,
    {useNewUrlParser: true}
);

// Handle db conncection
let db = mongoose.connection;

db.once('open', () => console.log('connected to db'));

db.on('error', console.error.bind(console, "MongoDB connection error:"));

// Handle body parsing and logging middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("combined"));

// Set up routes from routers folder and use for /api route
routes(router);
app.use('/api', router);

// Directs other paths to React index page
app.get('*', (req, res) => {
    res.sendFile( path.join( reactFolder, 'index.html' ) );
});

// launch our backend into a port
app.listen(process.env.API_PORT, () => 
    console.log(`LISTENING ON PORT ${process.env.API_PORT}`)
);