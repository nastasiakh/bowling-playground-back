import * as express from 'express';
import {UsersController} from './users/users';
import {UsersRepository} from './users/user.repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
admin.initializeApp({credential: admin.credential.applicationDefault()});

const corsConfig = cors;
const app: express.Express = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use('/', (req, res) =>{
  res.send('welcome');
});

app.use('/signup/info', new UsersController(
    new UsersRepository(admin.firestore())).build());

app.use(corsConfig())
exports.api = functions.https.onRequest(app);
