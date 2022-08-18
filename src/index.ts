import * as express from 'express';
import {UsersController} from './users/users';
import {UsersRepository} from './users/user.repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({credential: admin.credential.applicationDefault()});

const app: express.Express = express();

app.use('/', (req, res) =>{
  res.send({version: '1.0.0'});
});

app.use('/signup/info', new UsersController(
    new UsersRepository(admin.firestore())).build());

app.use((req,res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://first-back-end-21211.web.app');
  next();
});

exports.api = functions.https.onRequest(app);
