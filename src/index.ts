import * as express from 'express';
import {UsersController} from './users/users';
import {UsersRepository} from './users/user.repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({credential: admin.credential.applicationDefault()});

const app: express.Express = express();

app.get('/', (req,res) => {
  res.send('welcome');
})

app.use('/signup/info', new UsersController(
    new UsersRepository(admin.firestore())).build());

exports.api = functions.https.onRequest(app);
