import express from 'express';
import session from 'express-session';
import routes from './routes/index.js';
import handlebars from 'express-handlebars';
import { middle3 } from './middleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    name : 'AuthCookie'
}));

app.use("/register", middle3);

//public
app.use("/public", express.static('public'));


app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
routes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });
