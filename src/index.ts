import * as express from 'express';
import {UsersController} from './users/users';
import {UsersRepository} from './users/user.repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({credential: admin.credential.applicationDefault()});

const app: express.Express = express();

app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://first-back-end-21211.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', (req, res) => {
  res.send({version: `1.0.${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_SHA}`});
});

app.use('/signup/info', new UsersController(
    new UsersRepository(admin.firestore())).build());


exports.api = functions.https.onRequest(app);
