import * as express from 'express';
import {UsersController} from './users/users';
import {UsersRepository} from './users/user.repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {ThrowsController} from './throws/throws';
import {ThrowsRepository} from './throws/throw.repository';
import {TrainingRepository} from "./trainings/training.repository";
import {TrainingController} from "./trainings/training";

admin.initializeApp({credential: admin.credential.applicationDefault()});

const app: express.Express = express();

app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://first-back-end-21211.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) =>{
  const authHeader = req.header('Authorization')
  if(authHeader === undefined || authHeader === null){
    next('');
  } else {
    const idToken = authHeader?.split(' ')[1]
    admin.auth().verifyIdToken(idToken).then((decodedToken) =>{
      const uid = decodedToken.uid
      req.userId = uid
      next()
    }).catch((e) => next(e))
  }
})

app.use('/signup/info', new UsersController(
    new UsersRepository(admin.firestore())).build());

app.use('/throws', new ThrowsController(
  new ThrowsRepository(admin.firestore())).build());

app.use('/trainings', new TrainingController(
  new TrainingRepository(admin.firestore())).build());

app.get('/', (req, res) => {
  res.send({version: `1.0.${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_SHA}`});
});


exports.api = functions.https.onRequest(app);
