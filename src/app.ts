import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import router from './routes';
import db from './config/db'

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

db.connect();
router.route(app);

app.listen(3000, () => {
    console.log('Server running');
})